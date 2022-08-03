import { Router } from "express";
import ProductoController from "../controller/ProductoController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";


const router = Router();
//Get ALL Productos
router.get('/',[checkJwt,checkRole(['admin'])],ProductoController.getAll);

//Get ONE Producto
router.get('/:id',[checkJwt,checkRole(['admin'])],ProductoController.getById);

//NEW Producto
router.post('/',[checkJwt,checkRole(['admin'])],ProductoController.newProducto);

//EDIT Producto
router.put('/:id',[checkJwt,checkRole(['admin'])],ProductoController.editProducto);

//DELETE Producto
router.delete('/:id',[checkJwt,checkRole(['admin'])],ProductoController.deleteProducto);

export default router;