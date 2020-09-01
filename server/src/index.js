const express = require('express');

const app = express();

app.get('/', () => {
    console.log('Acessou os requisitos');
    
})

app.listen(3333);