// ⚠️ ATENÇÃO: Este Model NÃO tem tratamento de erros!
// 🎯 TAREFA: Adicionar throw NotFoundError e throw ValidationError

import { readFile, writeFile } from "fs/promises";
import { Filme, CriarFilmeBody, AtualizarFilmeBody } from "../interfaces";

const ARQUIVO = "dados/filmes.json";

async function carregar(): Promise<Filme[]> {
  try { return JSON.parse(await readFile(ARQUIVO, "utf-8")) as Filme[]; }
  catch { await writeFile(ARQUIVO, "[]"); return []; }
}

async function salvar(filmes: Filme[]): Promise<void> {
  await writeFile(ARQUIVO, JSON.stringify(filmes, null, 2));
}

export async function listarTodos(): Promise<Filme[]> {
  return carregar();
}

// ⚠️ Retorna undefined se não encontrar — deveria lançar throw!
export async function buscarPorId(id: number): Promise<Filme | undefined> {
  return (await carregar()).find(f => f.id === id);
}

// ⚠️ NÃO valida os dados — deveria lançar ValidationError!
export async function criar(dados: CriarFilmeBody): Promise<Filme> {
  const filmes = await carregar();
  const novo: Filme = {
    id: (filmes.at(-1)?.id ?? 0) + 1,
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

// ⚠️ Retorna null se não encontrar — deveria lançar throw!
export async function atualizar(id: number, dados: AtualizarFilmeBody): Promise<Filme | null> {
  const filmes = await carregar();
  const i = filmes.findIndex(f => f.id === id);
  if (i === -1) return null;
  filmes[i] = { ...filmes[i], ...dados, id };
  await salvar(filmes);
  return filmes[i];
}

// ⚠️ Retorna null se não encontrar — deveria lançar throw!
export async function remover(id: number): Promise<Filme | null> {
  const filmes = await carregar();
  const i = filmes.findIndex(f => f.id === id);
  if (i === -1) return null;
  const removido = filmes.splice(i, 1)[0];
  await salvar(filmes);
  return removido;
}
