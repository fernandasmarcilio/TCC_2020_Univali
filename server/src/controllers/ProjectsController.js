const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id_usuario } = request.query;

        const projects = await db('projetos')
                            .where('id_usuario', id_usuario)
                            .select('*');

        return response.json( projects );
    },

    async create(request, response) {
        // ao criar um projeto, adicionar todos os requisitos pre-cadastrado nele?
        const { nome, descricao, id_usuario } = request.body;

        await db('projetos').insert({
            nome, 
            descricao,
            id_usuario
        })
    
        return response.status(201).send();
    },

    async delete(request, response) {
        // ao deletar o projeto, tem que deletar os requisitos que esta ligado a este projeto?
        const { id } = request.params;

        await db('projetos')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}