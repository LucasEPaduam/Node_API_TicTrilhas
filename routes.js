import fs from 'fs';

export default function rota(req, res, dado){
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

    if(req.method === 'PUT' && req.url === '/arquivos'){
        const body = [];

        req.on('data', (part) => {
            body.push(part);
        });

        req.on('end', () => {
            const arquivo = JSON.parse(body);

            res.statusCode = 400;

            if(!arquivo?.nome){
                const resposta = {
                    error: {
                        mensagen: `Nome não encontrado`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }

            fs.writeFile(`${arquivo.nome}.txt`, arquivo?.conteudo ?? '', 'utf-8', (error) => {
                if(error){
                    console.log('Falha ao criar arquivo', error);

                    res.statusCode = 500;

                    const resposta = {
                        error: {
                            mensage: `Falha ao criar arquivo ${arquivo.nome}`
                        }
                    };

                    res.end(JSON.stringify(resposta));

                    return;
                }

                res.statusCode = 201;

                const resposta = {
                    mensagem: `Arquivo ${arquivo.nome} criado com sucesso`
                };

                res.end(JSON.stringify(resposta));

                return;
            });

            
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

    if(req.method === 'PATCH' && req.url === '/arquivos'){
        const body = [];

        req.on('data', (part) => {
            body.push(part);
        });

        req.on('end', () => {
            const arquivo = JSON.parse(body);

            res.statusCode = 400;

            if(!arquivo?.nome){
                const resposta = {
                    error: {
                        mensagem: `O atributo NOME não FOI encontrado, porém é um item obrigatório para atualização do arquivo`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }

            if(!arquivo?.conteudo){
                const resposta = {
                    error: {
                        mensagem: `O atributo CONTEUDO não FOI encontrado, porém é um item obrigatório para atualização do arquivo`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }

            fs.access(`${arquivo.nome}.txt`, fs.constants.W_OK, (error) => {

                if(error){
                    console.log('Falha ao acessar arquivo', error);

                    res.statusCode = error.code === 'ENOENT' ? 404 : 403;

                    const resposta = {
                        error: {
                            mensagem: `Falha ao acessar arquivo ${arquivo.nome}`
                        }
                    };

                    res.end(JSON.stringify(resposta));

                    return;

                }

                fs.appendFile(`${arquivo.nome}.txt`, `\n${arquivo.conteudo}`, 'utf-8', (error) => {
                    if(error){
                        console.log('Falha ao atualizar arquivo', error);
    
                        res.statusCode = 500;
    
                        const resposta = {
                            error: {
                                mensage: `Falha ao atualizar arquivo ${arquivo.nome}`
                            }
                        };
    
                        res.end(JSON.stringify(resposta));
    
                        return;
                    }
    
                    res.statusCode = 200;
    
                    const resposta = {
                        mensagem: `Arquivo ${arquivo.nome} atualizado com sucesso`
                    };
    
                    res.end(JSON.stringify(resposta));
    
                    return;
                });

            });
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
    
    if(req.method === 'DELETE' && req.url === '/arquivos'){
        const body = [];

        req.on('data', (part) => {
            body.push(part);
        });

        req.on('end', () => {
            const arquivo = JSON.parse(body);

            res.statusCode = 400;

            if(!arquivo?.nome){
                const resposta = {
                    error: {
                        mensagem: `O atributo NOME não FOI encontrado, porém é um item obrigatório para remoção do arquivo`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }


            fs.access(`${arquivo.nome}.txt`, fs.constants.W_OK, (error) => {

                if(error){
                    console.log('Falha ao acessar arquivo', error);

                    res.statusCode = error.code === 'ENOENT' ? 404 : 403;

                    const resposta = {
                        error: {
                            mensagem: `Falha ao acessar arquivo ${arquivo.nome}`
                        }
                    };

                    res.end(JSON.stringify(resposta));

                    return;

                }

                fs.rm(`${arquivo.nome}.txt`, (error) => {
                    if(error){
                        console.log('Falha ao remover arquivo', error);
    
                        res.statusCode = 500;
    
                        const resposta = {
                            error: {
                                mensage: `Falha ao remover arquivo ${arquivo.nome}`
                            }
                        };
    
                        res.end(JSON.stringify(resposta));
    
                        return;
                    }
    
                    res.statusCode = 200;
    
                    const resposta = {
                        mensagem: `Arquivo ${arquivo.nome} removido com sucesso`
                    };
    
                    res.end(JSON.stringify(resposta));
    
                    return;
                });

            });
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