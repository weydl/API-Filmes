// ⚠️ ATENÇÃO: Este Controller NÃO tem try/catch nem next(erro)!
// 🎯 TAREFA: Adicionar try/catch + next(erro) em TODAS as funções
// 🎯 TAREFA: Remover os if (!filme) — o Model vai lançar throw!

import { Request, Response } from "express";
import * as FilmeModel from "../models/filmeModel";
import { ApiResponse, Filme, FilmeParams, FiltroQuery, CriarFilmeBody, AtualizarFilmeBody } from "../interfaces";

export async function listar(req: Request<{},{},{},FiltroQuery>, res: Response) {
  let filmes = await FilmeModel.listarTodos();
  if (req.query.classificacao) filmes = filmes.filter(f => f.classificacao === req.query.classificacao);
  res.json({ sucesso: true, dados: filmes } as ApiResponse<Filme[]>);
}

export async function buscarPorId(req: Request<FilmeParams>, res: Response) {
  const id = Number(req.params.id);
  const filme = await FilmeModel.buscarPorId(id);

  // ⚠️ Isso se REPETE em toda função — com erros customizados, some!
  if (!filme) {
    res.status(404).json({ sucesso: false, erro: "Filme não encontrado" } as ApiResponse<null>);
    return;
  }
  res.json({ sucesso: true, dados: filme } as ApiResponse<Filme>);
}

export async function criar(req: Request, res: Response) {
  const dados = req.body as CriarFilmeBody;

  // ⚠️ Validação MANUAL e REPETITIVA — com ValidationError fica no Model!
  const erros: string[] = [];
  if (!dados.titulo || dados.titulo.trim() === "") erros.push("título é obrigatório");
  if (!dados.diretor || dados.diretor.trim() === "") erros.push("diretor é obrigatório");
  if (typeof dados.anoLancamento !== "number" || dados.anoLancamento < 1895 || dados.anoLancamento > 2026)
    erros.push("ano deve ser entre 1895 e 2026");
  if (typeof dados.nota !== "number" || dados.nota < 0 || dados.nota > 10)
    erros.push("nota deve ser entre 0 e 10");

  if (erros.length > 0) {
    res.status(400).json({ sucesso: false, erros } as ApiResponse<null>);
    return;
  }

  const novo = await FilmeModel.criar(dados);
  res.status(201).json({ sucesso: true, dados: novo } as ApiResponse<Filme>);
}

export async function atualizar(req: Request<FilmeParams>, res: Response) {
  const id = Number(req.params.id);
  const atualizado = await FilmeModel.atualizar(id, req.body as AtualizarFilmeBody);

  // ⚠️ Mesma verificação REPETIDA!
  if (!atualizado) {
    res.status(404).json({ sucesso: false, erro: "Filme não encontrado" } as ApiResponse<null>);
    return;
  }
  res.json({ sucesso: true, dados: atualizado } as ApiResponse<Filme>);
}

export async function remover(req: Request<FilmeParams>, res: Response) {
  const id = Number(req.params.id);
  const removido = await FilmeModel.remover(id);

  // ⚠️ Mesma verificação REPETIDA mais uma vez!
  if (!removido) {
    res.status(404).json({ sucesso: false, erro: "Filme não encontrado" } as ApiResponse<null>);
    return;
  }
  res.json({ sucesso: true, dados: removido } as ApiResponse<Filme>);
}
