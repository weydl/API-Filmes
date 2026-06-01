import { Router } from "express";
import * as FC from "../controllers/filmeController";

export const filmeRoutes = Router();
filmeRoutes.get("/filmes",       FC.listar);
filmeRoutes.get("/filmes/:id",   FC.buscarPorId);
filmeRoutes.post("/filmes",      FC.criar);
filmeRoutes.put("/filmes/:id",   FC.atualizar);
filmeRoutes.delete("/filmes/:id",FC.remover);
