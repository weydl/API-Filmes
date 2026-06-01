import { Request, Response, NextFunction } from "express";
import { AppError, ValidationError } from "../errors";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof ValidationError) {
    res.status(400).json({
      sucesso: false,
      erro: err.message,
      erros: err.erros,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      sucesso: false,
      erro: err.message,
    });
    return;
  }

  console.error(err);

  res.status(500).json({
    sucesso: false,
    erro: "Erro interno do servidor",
  });
}