const db = require('../database/connection');

module.exports = {
    async findUser(request, response) {
        const { usuario, senha } = request.body;
        //senha cript
        const id_usuario = await db('usuario')
                            .where({
                                usuario,
                                senha
                            })
                            .select('id');

        return response.json( id_usuario );
    },

    async create(request, response) {
        const { nome, email, usuario, senha } = request.body.data;
        // verificar se tem email ou usuario
        // se ter, retorna erro, se nao cria
        // cript senha

        //2h
    
        await db('usuario').insert({
            nome, 
            email, 
            usuario, 
            senha
        })
    
        return response.send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('usuario')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}
