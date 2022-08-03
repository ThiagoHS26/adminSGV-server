import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Categoria } from "../entity/Categoria";
import { validate } from "class-validator";


class CategoriaController{

    //Traer todas las categorias
    static getAll = async(req:Request, res:Response)=>{
        const categoriaRepository = getRepository(Categoria);//De la base de datos

        try {
            const categorias = await categoriaRepository.find();
            res.send(categorias);
        } catch (e) {
            res.status(404).json({
                message:'No existen resultados'
            });
        }
    };

    //Trae una categoria
    static getById = async(req:Request, res:Response)=>{
        //desestructurar para traer id
        const {id} = req.params;
        ////////////////////////////////
        const categoriaRepository = getRepository(Categoria);

        try {
            const categoria = await categoriaRepository.findOneOrFail(id);
            res.send(categoria);
        } catch (e) {
            res.status(404).json({
                message:'No existen resultados'
            });
        }
    };

    //Crear nueva categoria
    static newCategoria = async(req:Request, res:Response)=>{
        //desestructurar para traer datos
        const {codigo, nombre,descripcion} = req.body;
        ////////////////////////////////
        const categoria = new Categoria();
        categoria.codigo = codigo;
        categoria.nombre = nombre;
        categoria.descripcion = descripcion;

        const categoriaRepository = getRepository(Categoria);

        try {
            await categoriaRepository.save(categoria);
        } catch (e) {
            return res.status(400).json({
                message:'La categoría ya existe'
            });
        }
        res.send('Categoría creada');
    };

    //Editar una categoria
    static editCategoria = async(req:Request, res:Response)=>{
        let categoria;
        const {id} = req.params;
        const {codigo, nombre, descripcion} = req.body;
        const categoriaRepository = getRepository(Categoria);//clase Categoria

        try {
            categoria = await categoriaRepository.findOneOrFail(id);

        } catch (e) {
            return res.status(404).json({
                message: 'Categoria no encontrado'
            });
        }

        categoria.codigo = codigo;
        categoria.nombre = nombre;
        categoria.descripcion = descripcion;
        
        const errors = await validate(categoria,{
            validateError:{target:false, value:false}//Los errores no se muestran por seguridad
        });
        
        if(errors.length > 0){
            res.status(400).json({errors});
        }

        try {
            await categoriaRepository.save(categoria);
        } catch (e) {
            return res.status(409).json({message: 'La categoría ya existe'});
        }

        res.status(201).json({message: 'Categoría actualizada'});
    };

    //Eliminar categoria 
    static deleteCategoria = async (req:Request, res:Response)=>{

        const {id} = req.params;
        const categoriaRepository = getRepository(Categoria);
        let categoria : Categoria;

        try {
            categoria = await categoriaRepository.findOneOrFail(id);
        } catch (e) {
            res.status(404).json({
                message:'Categoría no encontrada'
            });
        }

        categoriaRepository.delete(id);
        res.status(201).json({
            message:'Categoría eliminada'
        });

    };
}

export default CategoriaController;