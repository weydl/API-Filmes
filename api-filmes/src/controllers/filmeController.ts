import { Request, Response, NextFunction } from "express";
import * as FilmeModel from "../models/filmeModel";
import {
  ApiResponse,
  Filme,
  FilmeParams,
  FiltroQuery,
  CriarFilmeBody,
  AtualizarFilmeBody
} from "../interfaces";

export async function listar(
  req: Request<{},{},{},FiltroQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    let filmes = await FilmeModel.listarTodos();

    if (req.query.classificacao) {
      filmes = filmes.filter(
        f => f.classificacao === req.query.classificacao
      );
    }

    res.json({
      sucesso: true,
      dados: filmes
    } as ApiResponse<Filme[]>);

  } catch (erro) {
    next(erro);
  }
}

export async function buscarPorId(
  req: Request<FilmeParams>,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const filme = await FilmeModel.buscarPorId(id);

    res.json({
      sucesso: true,
      dados: filme
    } as ApiResponse<Filme>);

  } catch (erro) {
    next(erro);
  }
}

export async function criar(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dados = req.body as CriarFilmeBody;

    const novo = await FilmeModel.criar(dados);

    res.status(201).json({
      sucesso: true,
      dados: novo
    } as ApiResponse<Filme>);

  } catch (erro) {
    next(erro);
  }
}

export async function atualizar(
  req: Request<FilmeParams>,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const atualizado = await FilmeModel.atualizar(
      id,
      req.body as AtualizarFilmeBody
    );

    res.json({
      sucesso: true,
      dados: atualizado
    } as ApiResponse<Filme>);

  } catch (erro) {
    next(erro);
  }
}

export async function remover(
  req: Request<FilmeParams>,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const removido = await FilmeModel.remover(id);

    res.json({
      sucesso: true,
      dados: removido
    } as ApiResponse<Filme>);

  } catch (erro) {
    next(erro);
  }
}