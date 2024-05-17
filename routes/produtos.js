import express from "express";
import {
  sequelize,
  criaProduto,
  readProdutos,
  readProdutosById,
  updateProdutosById,
  deleteProdutosById,
} from "./../models.js";

export const rotasProduto = express.Router();

rotasProduto.post("/produtos", async (req, res, next) => {
  const produto = req.body;

  res.statusCode = 400;

  if (!produto?.nome) {
    const resposta = {
      error: {
        mensagen: `Nome não encontrado`,
      },
    };

    res.send(resposta);

    return;
  }

  if (!produto?.preco) {
    const resposta = {
      error: {
        mensagen: `Preco não encontrado`,
      },
    };

    res.send(resposta);

    return;
  }

  try {
    const resposta = await criaProduto(produto);

    res.statusCode = 201;
    res.send(resposta);

    return;
  } catch (error) {
    console.log("Falha ao criar produto", error);

    res.statusCode = 500;

    const resposta = {
      error: {
        mensage: `Falha ao criar produto ${produto.nome}`,
      },
    };

    res.send(resposta);

    return;
  }
});

rotasProduto.patch("/produtos/:id", async (req, res, next) => {
  const produto = req.body;

  res.statusCode = 400;

  if (!produto?.nome && !produto.preco) {
    const resposta = {
      error: {
        mensagem: `Nenhum atributo encontrado, porém ao menos um item é obrigatório para atualização do produto`,
      },
    };

    res.send(resposta);

    return;
  }

  const id = req.params.id;
  try {
    const resposta = await updateProdutosById(id, produto);

    res.statusCode = 200;

    if (!resposta) {
      res.statusCode = 404;
    }

    res.send(resposta);

    return;
  } catch (error) {
    console.log("Falha ao atualizar produto", error);

    res.statusCode = 500;

    const resposta = {
      error: {
        mensage: `Falha ao atualizar produto ${id}`,
      },
    };

    res.send(resposta);

    return;
  }
});

rotasProduto.delete("/produtos/:id", async (req, res, next) => {
  console.log(`Entrou na rota delete`);
  const id = req.params.id;

  try {
    const encontrado = await deleteProdutosById(id);

    res.statusCode = 204;

    res.send();
  } catch (error) {
    console.log("Falha ao remover produto", error);

    res.statusCode = 500;

    const resposta = {
      error: {
        mensage: `Falha ao remover produto ${id}`,
      },
    };

    res.send(resposta);

    return;
  }
});

rotasProduto.get("/produtos/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const resposta = await readProdutosById(id);

    res.statusCode = 200;

    if (!resposta) {
      res.statusCode = 404;
    }

    res.send(resposta);
  } catch (error) {
    console.log("Falha ao buscar produto", error);

    res.statusCode = 500;

    const resposta = {
      error: {
        mensage: `Falha ao buscar produto ${id}`,
      },
    };

    res.send(resposta);

    return;
  }
});

rotasProduto.get("/produtos", async (req, res, next) => {
  try {
    const resposta = await readProdutos();

    res.statusCode = 200;

    res.send(resposta);
  } catch (error) {
    console.log("Falha ao buscar produtos", error);

    res.statusCode = 500;

    const resposta = {
      error: {
        mensage: `Falha ao buscar produtos`,
      },
    };

    res.send(resposta);

    return;
  }
});
