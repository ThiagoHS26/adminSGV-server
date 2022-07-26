import { Router } from "express";
import CategoriaController  from "../controller/CategoriaController";


const router = Router();
//Get ALL Categorias
router.get('/',CategoriaController.getAll);

//Get ONE Categoria
router.get('/:id',CategoriaController.getById);

//NEW Categoria
router.post('/',CategoriaController.newCategoria);

//EDIT Categoria
router.put('/:id',CategoriaController.editCategoria);

//DELETE Categoria
router.delete('/:id',CategoriaController.deleteCategoria);


export default router;