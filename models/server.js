import express from 'express';
import cors from 'cors';
import router from '../routes/routes.js'
import dbConnection from '../database/config.js'
import hbs from 'hbs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.routePath = '/'

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + process.env.PORT)
        })
    }

    middlewares() {

        //hbs
        this.app.set('view engine', 'hbs');
        hbs.registerPartials(path.join(__dirname, "../views/partials"));
        // hbs.registerHelper
        

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());


        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.routePath, router);
    }

    async conectarDB() {
        await dbConnection();
    }


}

export default Server;