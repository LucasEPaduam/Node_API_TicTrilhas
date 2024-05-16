import sqlite3 from 'sqlite3';
import { sequelize } from './models.js';
import bodyParser from 'body-parser';

import express from 'express';

const app = express();

app.use(bodyParser.json());

app.use('/produtos', (req, res, next) => {
    console.log('Rota produtos');
    res.send({mensagem: "Rota produtos success"})
});

app.use((req, res, next) => {
    console.log('problema resolvido');
    res.send({mensagem: "Problema resolvido"})
});

    async function inicializaApp(){

        const db = new sqlite3.Database('./tic.db', (error) => {
            if(error){
                console.log('Falha ao inicializar o Banco de Dados', error);
                return;
            }
        
            console.log('Banco de Dados inicializado com sucesso');
        });

        await sequelize.sync();        

        const port = 3000;
        
        app.listen(port);
        
    }

    inicializaApp();




