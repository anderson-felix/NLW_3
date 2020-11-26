import e, { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

// {
//   "name":["obrigatorio","maximo de caracteres atingido"]
//   "latitude":["obrigatorio","maximo de caracteres atingido"]
//   "longitude":["obrigatorio","maximo de caracteres atingido"]
//   ...etc
// }

//A interface abaixo mostra a forma correta de como informar o tipo obrigatório do meu objeto

interface ValidationErrors {
  [key: string]: string[]; // a chave é do tipo string, e o valor é um array de strings
}

const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    // se o erro for da intancia ValidadationError
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });
    return res.status(400).json({ message: "Validation fails", errors });
  }

  console.error(error);

  return res.status(500).json({ message: "Internal server error" });
};

export default ErrorHandler;
