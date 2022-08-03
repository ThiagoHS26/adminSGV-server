import { Router } from "express";
import CategoriaController  from "../controller/CategoriaController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";


const router = Router();
//Get ALL Categorias
router.get('/',[checkJwt,checkRole(['admin'])],CategoriaController.getAll);

//Get ONE Categoria
router.get('/:id',[checkJwt,checkRole(['admin'])],CategoriaController.getById);

//NEW Categoria
router.post('/',[checkJwt,checkRole(['admin'])],CategoriaController.newCategoria);

//EDIT Categoria
router.put('/:id',[checkJwt,checkRole(['admin'])],CategoriaController.editCategoria);

//DELETE Categoria
router.delete('/:id',[checkJwt,checkRole(['admin'])],CategoriaController.deleteCategoria);


export default router;