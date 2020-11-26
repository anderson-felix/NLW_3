import { Request, Response } from "express";
import * as Yup from "yup";
import { getRepository } from "typeorm"; // Toda operação feita para o banco de dados passa por um repositório (getRepository)
//                                                   O repositório é usado para manipular os dados (create,read,update,delete)

import Orphanage from "./../models/Orphanage";
import orphanageView from "../views/orphanages_view";

export default {
  async index(req: Request, res: Response) {
    // As alterações feitas no banco são assíncronas, demora alguns segundos para ser executada, então defino a função como async e utilizo o método await nas funções de manipulaçao do banco
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"], // as relations relaciona a busca com as files que ela contém, ou seja as imagens "images"
    });

    return res.json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params; // esse id precisa ter o mesmo nome que foi passasdo na rota

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(orphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    console.log(req.files);
    let {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    try {
      open_on_weekends = JSON.parse(open_on_weekends);
    } catch (e) {
      open_on_weekends = false;
    }

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const schema = Yup.object().shape({
      // schema é um objeto Yup com o formato:
      name: Yup.string().required("Campo obrigatório"),

      latitude: Yup.number().required("Campo obrigatório"),

      longitude: Yup.number().required("Campo obrigatório"),

      about: Yup.string().required("Campo obrigatório").max(300),

      instructions: Yup.string().required("Campo obrigatório"),

      opening_hours: Yup.string().required("Campo obrigatório"),

      open_on_weekends: Yup.boolean().required("Campo obrigatório"),

      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      // aguardar a validação do schema (data), o segundo parâmetro são condições
      abortEarly: false, // mostrar todos os erros antes de abortar a operação
    });

    const orphanages = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanages); // salvando as alterações no banco

    return res
      .status(201) // o status 201 significa que algo foi criado com sucesso
      .json({ message: `Orfanato ${orphanages.name} criado!` });
  },
};
