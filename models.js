import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './tic.db'
});

sequelize.authenticate();

export const Produto = sequelize.define('produto', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    preco:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

export async function criaProduto(produto){

    try{
        const resultado = await Produto.create(produto);
        console.log(`O produto ${resultado.nome} foi criado com sucesso`);
        return resultado;
    } catch (error){
        console.log(`Erro ao criar o produto`, error);
        throw error;
    }
    
}

export async function readProdutos(){
    try{
        const resultado = await Produto.findAll();
    console.log(`Produtos consultados com sucesso.`, resultado);
    return resultado;
    } catch(error){
        console.log(`Erro ao buscar o produto`, error);
        throw error;
    }
    
}

export async function readProdutosById(id){
    try{
        const resultado = await Produto.findByPk(id);
        console.log(`Produto consultado com sucesso.`, resultado);
        return resultado;        
    } catch(error){
        console.log(`Erro ao buscar o produto`, error);
        throw error;
    }
    
}

export async function updateProdutosById(id, dadosProduto){
    try{
        const resultado = await Produto.findByPk(id);
        if(resultado?.id){
            for (const chave in dadosProduto){
                if(chave in resultado){
                    resultado[chave] = dadosProduto[chave];
                }
            }
            resultado.save();
            console.log(`Produto atualizado com sucesso.`, resultado);
        }
        return resultado; 
               
    } catch(error){
        console.log(`Erro ao atualizar o produto`, error);
        throw error;
    }
    
}

export async function deleteProdutosById(id){
    try{
        const resultado = await Produto.destroy({ where: { id: id } });
        console.log(`Produto deletado com sucesso.`, resultado);        
    } catch(error){
        console.log(`Erro ao deletar o produto`, error);
        throw error;
    }
    
}