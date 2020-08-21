import express from 'express';

const app = express();

app.get('/requisitos', () => {
    console.log('Acessou os requisitos');
    
})

app.listen(3333);