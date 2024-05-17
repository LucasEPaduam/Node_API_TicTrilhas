import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./tic.db",
});

sequelize.authenticate();

export const Produto = sequelize.define("produto", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  preco: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

export async function criaProduto(produto) {
  try {
    const resultado = await Produto.create(produto);
    console.log(`O produto ${resultado.nome} foi criado com sucesso`);
    return resultado;
  } catch (error) {
    console.log(`Erro ao criar o produto`, error);
    throw error;
  }
}

export async function readProdutos() {
  try {
    const resultado = await Produto.findAll();
    console.log(`Produtos consultados com sucesso.`, resultado);
    return resultado;
  } catch (error) {
    console.log(`Erro ao buscar o produto`, error);
    throw error;
  }
}

export async function readProdutosById(id) {
  try {
    const resultado = await Produto.findByPk(id);
    console.log(`Produto consultado com sucesso.`, resultado);
    return resultado;
  } catch (error) {
    console.log(`Erro ao buscar o produto`, error);
    throw error;
  }
}

export async function updateProdutosById(id, dadosProduto) {
  try {
    const resultado = await Produto.findByPk(id);
    if (resultado?.id) {
      for (const chave in dadosProduto) {
        if (chave in resultado) {
          resultado[chave] = dadosProduto[chave];
        }
      }
      resultado.save();
      console.log(`Produto atualizado com sucesso.`, resultado);
    }
    return resultado;
  } catch (error) {
    console.log(`Erro ao atualizar o produto`, error);
    throw error;
  }
}

export async function deleteProdutosById(id) {
  try {
    const resultado = await Produto.destroy({ where: { id: id } });
    console.log(`Produto deletado com sucesso.`, resultado);
  } catch (error) {
    console.log(`Erro ao deletar o produto`, error);
    throw error;
  }
}

const Pedido = sequelize.define("pedido", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valor_total: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  status_pedido: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const ProdutosPedido = sequelize.define("produtos_pedido", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  preco: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

Produto.belongsToMany(Pedido, { through: ProdutosPedido });
Pedido.belongsToMany(Produto, { through: ProdutosPedido });

export async function criarPedido(novoPedido) {
  try {
    const pedido = await Pedido.create({
      valor_total: novoPedido.valorTotal,
      status_pedido: "ENCAMINHADO",
    });

    for (const prod of novoPedido.produtos) {
      const produto = await Produto.findByPk(prod.id);
      if (produto) {
        pedido.addProduto(produto, {
          through: { quantidade: prod.quantidade, preco: produto.preco },
        });
      }
    }

    console.log(`Pedido criado com sucesso.`);
    return pedido;
  } catch (error) {
    console.log(`Falha ao criar pedido.`, error);
    throw error;
  }
}

export async function readPedidos() {
  try {
    const resultado = await ProdutosPedido.findAll();
    console.log(`Pedido consultados com sucesso.`, resultado);
    return resultado;
  } catch (error) {
    console.log(`Erro ao buscar o pedido`, error);
    throw error;
  }
}

export async function readPedidoById(id) {
  try {
    const resultado = await ProdutosPedido.findByPk(id);
    console.log(`Pedido consultado com sucesso.`, resultado);
    return resultado;
  } catch (error) {
    console.log(`Erro ao buscar o pedido`, error);
    throw error;
  }
}
