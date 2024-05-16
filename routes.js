import fs from 'fs';
import { sequelize, criaProduto, readProdutos, readProdutosById, updateProdutosById, deleteProdutosById } from './models.js';


export default async function rota(req, res, dado){
    res.setHeader('Content-type', 'application/json', 'utf-8');

    if(req.method === 'GET' && req.url === '/'){
    
        const {conteudo} = dado;
    
    res.statusCode = 200;
    
    const resposta = {
        mensagem: conteudo
    };

    res.end(JSON.stringify(resposta));

    return;

    }

    if(req.method === 'POST' && req.url === '/produtos'){
        const body = [];

        req.on('data', (part) => {
            body.push(part);
        });

        req.on('end', async () => {
            const produto = JSON.parse(body);

            res.statusCode = 400;

            if(!produto?.nome){
                const resposta = {
                    error: {
                        mensagen: `Nome não encontrado`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }

            if(!produto?.preco){
                const resposta = {
                    error: {
                        mensagen: `Preco não encontrado`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }

            try {
                const resposta = await criaProduto(produto);

                res.statusCode = 201;
                res.end(JSON.stringify(resposta));

                return;

            } catch(error) {
                console.log('Falha ao criar produto', error);

                    res.statusCode = 500;

                    const resposta = {
                        error: {
                            mensage: `Falha ao criar produto ${produto.nome}`
                        }
                    };

                    res.end(JSON.stringify(resposta));

                    return;
            }
            
        });

        req.on('error', (error) => {
            console.log('Falha ao processar requisição', error);

            res.statusCode = 400;

            const resposta = {
                error:{
                    mensagem:'Falha ao processar a requisição'
                }
            };

            res.end(JSON.stringify(resposta));

            return;
        });

        return;
    }

    if(req.method === 'PATCH' && req.url.split('/')[1] === 'produtos' && !isNaN(req.url.split('/')[2])){
        const body = [];

        req.on('data', (part) => {
            body.push(part);
        });

        req.on('end', async () => {
            const produto = JSON.parse(body);

            res.statusCode = 400;

            if(!produto?.nome && !produto.preco){
                const resposta = {
                    error: {
                        mensagem: `Nenhum atributo encontrado, porém ao menos um item é obrigatório para atualização do produto`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }

            const id = req.url.split('/')[2];
            try {
                const resposta = await updateProdutosById(id, produto);
                
                res.statusCode = 200;
                res.end(JSON.stringify(resposta));

                return;

            } catch (error){

                console.log('Falha ao atualizar produto', error);
    
                    res.statusCode = 500;
    
                    const resposta = {
                        error: {
                                mensage: `Falha ao atualizar produto ${produto.nome}`
                        }
                    };
    
                    res.end(JSON.stringify(resposta));
    
                return;

            }
           
        });

        req.on('error', (error) => {
            console.log('Falha ao processar requisição', error);

            res.statusCode = 400;

            const resposta = {
                error:{
                    mensagem:'Falha ao processar a requisição'
                }
            };

            res.end(JSON.stringify(resposta));

            return;
        });

        return;
    }
    
    if(req.method === 'DELETE' && req.url.split('/')[1] === 'produtos' && !isNaN(req.url.split('/')[2])){

        const id = req.url.split('/')[2];

        try {
            const resposta =  await deleteProdutosById(id);

            res.statusCode = 204;
            res.end();

        } catch(error){

            console.log('Falha ao remover produto', error);

            res.statusCode = 500;

            const resposta = {
                error: {
                    mensage: `Falha ao remover produto ${id}`
                }
            };

            res.end(JSON.stringify(resposta));

            return;

        }

        return;
    }

    if(req.method === 'GET' && req.url.split('/')[1] === 'produtos' && !isNaN(req.url.split('/')[2])){

        const id = req.url.split('/')[2];

        try {
            const resposta =  await readProdutosById(id);

            res.statusCode = 200;

            res.end(JSON.stringify(resposta));

        } catch(error){

            console.log('Falha ao buscar produto', error);

            res.statusCode = 500;

            const resposta = {
                error: {
                    mensage: `Falha ao buscar produto ${id}`
                }
            };

            res.end(JSON.stringify(resposta));

            return;

        }


        

        return;
    }



    res.statusCode = 404;

    const resposta = {
        erro:{
            mensagem: 'Rota não encontrada',
            url: req.url
        }
    };

    res.end(JSON.stringify(resposta));

    return;
}