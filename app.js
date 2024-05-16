import sqlite3 from 'sqlite3';
import { sequelize } from './models.js';

import express from 'express';

const app = express();

app.use((req, res, next) => {
    console.log('Digite 9 para falar com o atendente');
    next();
});

app.use((req, res, next) => {
    console.log('problema resolvido');
    res.send({mensagem: "Problema resolvido"})
});

app.use((req, res, next) => {
    console.log('Segue o link');
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




