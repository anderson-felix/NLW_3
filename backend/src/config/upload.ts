import multer from "multer"; // o multer é uma biblioteca que auxilia o banco de dados a guardar arquivos de midia no geral
import path from "path"; // o path auxilia a busca por diretórios

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    filename: (request, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`; // o date.now() retorna a hora atual do registro, e o file.originalName retorna o nome original do arquivo salvo

      cb(null, filename); // o callback é uma função, parecido com o return porém retornando sempre dois parametros, o primeiro recebe um tipo de erro(declarado como null por não ser provavel um erro) e o segundo um retorno.
    },
  }),
};
