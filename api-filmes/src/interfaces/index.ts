// Interfaces PRONTAS — não precisa alterar
export interface Filme {
  id: number;
  titulo: string;
  diretor: string;
  anoLancamento: number;
  classificacao: "Livre" | "10" | "12" | "14" | "16" | "18";
  nota: number;
}

export interface CriarFilmeBody {
  titulo: string;
  diretor: string;
  anoLancamento: number;
  classificacao: "Livre" | "10" | "12" | "14" | "16" | "18";
  nota: number;
}

export interface AtualizarFilmeBody {
  titulo?: string;
  diretor?: string;
  anoLancamento?: number;
  classificacao?: "Livre" | "10" | "12" | "14" | "16" | "18";
  nota?: number;
}

export interface FilmeParams { id: string; }
export interface FiltroQuery { classificacao?: string; }
export interface ApiResponse<T> { sucesso: boolean; dados?: T; erro?: string; erros?: string[]; }
