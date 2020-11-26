import express from "express";
import path from "path";
import cors from "cors";
import "express-async-errors";

import "./database/connection";

import routes from "./routes";
import errorHandler from "./errors/handler";

const server = express();

server.use(cors());

server.use(express.json());

server.use(routes);
//quando eu acessar o caminho /uploads uso o express.static para unir junto a requisição, o caminho para as imagens
server.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
//                                 diretótio atual(server), ../ , pasta de imagens(uploads)

server.use(errorHandler);

server.listen(3333);
