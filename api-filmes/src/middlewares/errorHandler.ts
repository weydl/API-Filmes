// ============================================================
// 🎯 TAREFA: Crie o middleware de erro aqui!
// ============================================================
//
// 1. Importar AppError e ValidationError de "../errors"
// 2. Criar função errorHandler com 4 parâmetros (err, req, res, next)
// 3. Se err instanceof ValidationError → 400 + erros[]
// 4. Se err instanceof AppError → err.statusCode + mensagem
// 5. Senão → console.error + 500
// 6. Exportar a função
//
// ============================================================

import { Request, Response, NextFunction } from "express";

// Escreva seu código aqui:

