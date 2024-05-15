import http from "http";
import fs from 'fs';
import rota from './routes.js'
import sqlite3 from 'sqlite3';
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './tic.db'
});

sequelize.authenticate();

const db = new sqlite3.Database('./tic.db', (error) => {
    if(error){
        console.log('Falha ao inicializar o Banco de Dados', error);
        return;
    }

    console.log('Banco de Dados inicializado com sucesso');
});

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






