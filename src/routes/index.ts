import { Router } from "express";
import auth from "./auth";
import usuario from "./usuario";
import categoria from "./categoria";
import producto from "./producto";

const routes = Router();

//Localhost:3000/auth/login

routes.use('/auth',auth);

//Localhost:3000/Usuario
routes.use('/usuarios',usuario);

//Localhost:3000/Categoria
routes.use('/categorias',categoria);

//Localhost:3000/Producto
routes.use('/productos',producto);


export default routes;