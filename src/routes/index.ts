import { Router } from "express";
import auth from "./auth";
import usuario from "./usuario";

const routes = Router();

//Localhost:3000/auth/login

routes.use('/auth',auth);

//Localhost:3000/Usuario
routes.use('/usuarios',usuario);


export default routes;