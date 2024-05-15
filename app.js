import http from "http";
import fs from 'fs';
import rota from './routes.js'

fs.writeFile('./mensagem.txt', 'Lucas Paduam TIC em Trilhas', 'utf-8', (error) => {
    if(error){
        console.log('Falha ao escrever o arquivo', error);
        return;
    }
    console.log('Arquivo criado com sucesso');
});

fs.readFile('./mensagem.txt', 'utf-8', (error, conteudo) => {
    if(error){
        console.log('Falha ao ler o arquivo', error);
        return;
        }
        console.log(`Conteúdo: ${conteudo}`);
        
        iniciaServidorHttp(conteudo);

    });

    function iniciaServidorHttp(conteudo){

        const servidor = http.createServer((req, res) => {
           
            rota(req, res, { conteudo });
        
        });
        
        const port = 3000;
        const host = 'localhost';
        
        servidor.listen(port, host, () => {
            console.log(`Servidor executando em http://${host}:${port}/`);
        });

    }






