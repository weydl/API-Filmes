# 🎬 API de Filmes — Prática Aula 29

API MVC de filmes **funcionando, mas SEM tratamento de erros**.
Sua tarefa: adicionar throw, classes de erro e middleware.

## Como executar
```bash
npm install
npm run dev
```

## Tarefas (em ordem)

### 1. Criar classes de erro (src/errors/index.ts)
- AppError, NotFoundError, ValidationError

### 2. Criar middleware de erro (src/middlewares/errorHandler.ts)
- 4 parâmetros, instanceof para decidir status

### 3. Refatorar o Model (src/models/filmeModel.ts)
- Trocar return null/undefined → throw NotFoundError
- Mover validação do Controller → throw ValidationError

### 4. Refatorar o Controller (src/controllers/filmeController.ts)
- Adicionar next: NextFunction + try/catch + next(erro)
- Remover os if (!filme) repetidos

### 5. Registrar no app.ts
- app.use(errorHandler) DEPOIS das rotas

### 6. Testar no Thunder Client
- GET /filmes/999 → 404
- POST com body vazio → 400 + erros[]
- DELETE /filmes/999 → 404
- GET /filmes → 200 (continua funcionando!)
