import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

//Rutas
//Login
router.post('/login',AuthController.login);
//Change password
router.post('/cambio-password',[checkJwt],AuthController.changePassword);

export default router;