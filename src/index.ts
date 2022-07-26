import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as cors from "cors";//cabeceras de frontend
import helmet from "helmet";//Seguridad de las cabeceras de html
import routes from "./routes/index";

const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {

    //Create express app
    const app = express();

    //Middleware
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    //Rutas
    app.use('/',routes);

    //Start express server
    app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });

}).catch(error => console.log(error));
