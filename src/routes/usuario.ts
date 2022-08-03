import { Router } from "express";
import UsuarioController from "../controller/UsuarioController"; 
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

//Get All Usuarios
router.get('/',[checkJwt,checkRole(['admin'])],UsuarioController.getAll);

//Get One Usuario
router.get('/:id',[checkJwt,checkRole(['admin'])],UsuarioController.getById);

//New Usuario
router.post('/',[checkJwt,checkRole(['admin'])],UsuarioController.newUsuario);

//Edit Usuario
router.put('/:id',[checkJwt,checkRole(['admin'])],UsuarioController.editUsuario);

//Delete One Usuario
router.delete('/:id',[checkJwt,checkRole(['admin'])],UsuarioController.deleteUsuario);

//Cambiar la contraseña
router.put('/cambio-password/:id',[checkJwt],UsuarioController.cambioPassword);

export default router;