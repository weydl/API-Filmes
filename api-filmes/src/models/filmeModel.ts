import { readFile, writeFile } from "fs/promises";
import { Filme, CriarFilmeBody, AtualizarFilmeBody } from "../interfaces";
import { NotFoundError, ValidationError } from "../errors";

const ARQUIVO = "dados/filmes.json";

async function carregar(): Promise<Filme[]> {
  try {
    return JSON.parse(await readFile(ARQUIVO, "utf-8")) as Filme[];
  } catch {
    await writeFile(ARQUIVO, "[]");
    return [];
  }
}

async function salvar(filmes: Filme[]): Promise<void> {
  await writeFile(ARQUIVO, JSON.stringify(filmes, null, 2));
}

export async function listarTodos(): Promise<Filme[]> {
  return carregar();
}

export async function buscarPorId(id: number): Promise<Filme> {
  const filme = (await carregar()).find(f => f.id === id);

  if (!filme) {
    throw new NotFoundError("Filme");
  }

  return filme;
}

export async function criar(dados: CriarFilmeBody): Promise<Filme> {
  const erros: string[] = [];

  if (!dados.titulo?.trim()) {
    erros.push("Título é obrigatório");
  }

  if (!dados.diretor?.trim()) {
    erros.push("Diretor é obrigatório");
  }

  if (
    dados.anoLancamento < 1895 ||
    dados.anoLancamento > 2026
  ) {
    erros.push("Ano de lançamento deve estar entre 1895 e 2026");
  }

  if (dados.nota < 0 || dados.nota > 10) {
    erros.push("Nota deve estar entre 0 e 10");
  }

  const classificacoesValidas = [
    "Livre",
    "10",
    "12",
    "14",
    "16",
    "18",
  ];

  if (!classificacoesValidas.includes(dados.classificacao)) {
    erros.push("Classificação inválida");
  }

  if (erros.length > 0) {
    throw new ValidationError(erros);
  }

  const filmes = await carregar();

  const novo: Filme = {
    id: (filmes.length > 0 ? filmes[filmes.length - 1].id : 0) + 1,
    titulo: dados.titulo,
    diretor: dados.diretor,
    anoLancamento: dados.anoLancamento,
    classificacao: dados.classificacao,
    nota: dados.nota,
  };

  filmes.push(novo);
  await salvar(filmes);

  return novo;
}

export async function atualizar(
  id: number,
  dados: AtualizarFilmeBody
): Promise<Filme> {
  const filmes = await carregar();

  const i = filmes.findIndex(f => f.id === id);

  if (i === -1) {
    throw new NotFoundError("Filme");
  }

  filmes[i] = {
    ...filmes[i],
    ...dados,
    id,
  };

  await salvar(filmes);

  return filmes[i];
}

export async function remover(id: number): Promise<Filme> {
  const filmes = await carregar();

  const i = filmes.findIndex(f => f.id === id);

  if (i === -1) {
    throw new NotFoundError("Filme");
  }

  const removido = filmes.splice(i, 1)[0];

  await salvar(filmes);

  return removido;
}