import { Router } from "express"; // o Router é um método de rotas do
import multer from "multer";

import OrphanagesController from "./controllers/OrphanagesController";
import uploadConfig from "./config/upload";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index); // index, show, create, update, delete
routes.get("/orphanages/:id", OrphanagesController.show);

routes.post("/orphanages", upload.array("images"), OrphanagesController.create);

export default routes;

//MVC

// MODEL - é um modelo de operações e manipulações feitas para o banco de dados
// VIEWS - são como os dados são visualizados pelo front-end
// CONTROLLERS - é onde fica a lógicas das rotas
