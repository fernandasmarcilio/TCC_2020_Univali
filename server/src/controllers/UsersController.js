const db = require('../database/connection');

module.exports = {
    //index - retorna uma lista
    //delete
    async create(request, response) {
        const { nome, email, usuario, senha } = request.body;
        // verificar se tem email ou usuario
        // cript senha

        //2h
    
        await db('usuario').insert({
            nome, 
            email, 
            usuario, 
            senha
        })
    
        return response.send();
    }
}
