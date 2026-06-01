import express from "express";
import { logger } from "./middlewares/logger";
import { filmeRoutes } from "./routes/filmeRoutes";
// 🎯 TODO: importar errorHandler de "./middlewares/errorHandler"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);

app.use(filmeRoutes);

// 🎯 TODO: app.use(errorHandler) — DEPOIS das rotas!

app.listen(3000, () => {
  console.log("✅ API Filmes rodando em http://localhost:3000");
  console.log("📡 Rotas: GET/POST /filmes, GET/PUT/DELETE /filmes/:id");
});
