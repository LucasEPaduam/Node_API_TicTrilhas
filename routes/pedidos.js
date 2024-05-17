import express from "express";
import { criarPedido, readPedidoById, readPedidos } from "./../models.js";

export const rotasPedidos = express.Router();

rotasPedidos.post("/pedidos", async (req, res, next) => {
  const pedido = req.body;

  res.statusCode = 400;

  if (!pedido?.produtos || !pedido.produtos.length) {
    const resposta = {
      erro: {
        mensagem: `O atributo produtos não foi encontrado ou está vazio, porém é obrigatório para criação de um pedido`,
      },
    };

    return res.send(resposta);
  }

  if (!pedido?.valorTotal || pedido.valorTotal <= 0) {
    const resposta = {
      erro: {
        mensagem: `O atributo valor total não foi encontrado ou é menor ou igual a zero, porém é obrigatório para criação de um pedido`,
      },
    };

    return res.send(resposta);
  }

  try {
    const resposta = await criarPedido(pedido);
    res.status(201).send(resposta);
  } catch (erro) {
    const resposta = {
      erro: {
        mensagem: `Falha ao criar pedido.`,
      },
    };
    res.status(500).send(resposta);
  }
});

rotasPedidos.get("/pedidos/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const resposta = await readPedidoById(id);

    res.statusCode = 200;

    if (!resposta) {
      res.statusCode = 404;
    }

    res.send(resposta);
  } catch (error) {
    console.log("Falha ao buscar pedido", error);

    res.statusCode = 500;

    const resposta = {
      error: {
        mensage: `Falha ao buscar pedido ${id}`,
      },
    };

    res.send(resposta);

    return;
  }
});

rotasPedidos.get("/pedidos", async (req, res, next) => {
  try {
    const resposta = await readPedidos();

    res.statusCode = 200;

    res.send(resposta);
  } catch (error) {
    console.log("Falha ao buscar pedidos", error);

    res.statusCode = 500;

    const resposta = {
      error: {
        mensage: `Falha ao buscar pedidos`,
      },
    };

    res.send(resposta);

    return;
  }
});
