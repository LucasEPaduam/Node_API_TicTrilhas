import sqlite3 from "sqlite3";
import { sequelize } from "./models.js";
import bodyParser from "body-parser";
import express from "express";

import { rotasProduto } from "./routes/produtos.js";
import { rotasPedidos } from "./routes/pedidos.js";

const app = express();

app.use(bodyParser.json());

app.use(rotasProduto);
app.use(rotasPedidos);

async function inicializaApp() {
  const db = new sqlite3.Database("./tic.db", (error) => {
    if (error) {
      console.log("Falha ao inicializar o Banco de Dados", error);
      return;
    }

    console.log("Banco de Dados inicializado com sucesso");
  });

  await sequelize.sync();

  const port = 3000;

  app.listen(port);

  console.log(`Servidor executando em http://localhost:${port}/`);
}

inicializaApp();
