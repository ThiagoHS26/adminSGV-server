import { getRepository } from "typeorm";
import { Request, Response } from "express";
import{ Usuario } from "../entity/Usuario";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { validate, Validate } from "class-validator";


class AuthController {
    static login = async(req:Request, res:Response)=>{
        const {email,password} = req.body;
        
        if(!email && password){

            return res.status(400).json({
                message:'Email o Password son requeridos'
            });
        }
        const usuarioRepository = getRepository(Usuario);//Desde entity
        let usuario : Usuario;

        try {
            usuario = await usuarioRepository.findOneOrFail({
                where:{email}
            });
        } catch (e) {
            return res.status(400).json({
                message:'Email o Password incorrectos'
            });
        }

        //Verficacion checkpassword
        if(!usuario.checkPassword(password)){
            return res.status(400).json({
                message:'Email o Password incorrectos'
            });
        }

        //Token
        const token = jwt.sign({id:usuario.id, email:usuario.email},config.jwtSecret,{expiresIn:'2h'});
        res.json({
            message:'Ok ',
            token,
            usuario
        });
    }

    //Cambiar password
    static changePassword = async(req:Request, res:Response)=>{
        const {id} = res.locals.jwtPayload;
        const {oldPassword, newPassword} = req.body;//solicitar la informacion

        if(!(oldPassword && newPassword)){
            res.status(400).json({
                message:'Password no coinciden'
            });
        }
        const usuarioRepository = getRepository(Usuario);//Base de datos
        let usuario:Usuario;

        try {
            usuario = await usuarioRepository.findOneOrFail(id);

        } catch (e) {
            res.status(400).json({
                message:'Solicita ayuda del Administrador'
            });
        }
        //Comparacion de passwords
        if(!(usuario.checkPassword(oldPassword))){
                return res.status(401).json({
                message:'Revisa el antiguo Password'
            });
        }

        usuario.password = newPassword;
        const errors = await validate(usuario,{validationError:{target:false,value:false}});
        
        if(errors.length > 0){
            res.status(400).json(errors);
        }

        //nuevo password encriptado
        usuario.hashPassword();
        usuarioRepository.save(usuario);
        res.json({
            message:'Password actualizado'
        });
    }
}
export default AuthController;