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
        const { nome, descricao, id_usuario } = request.body;

        await db('projetos').insert({
            nome, 
            descricao,
            id_usuario
        })
    
        return response.status(201).send();
    },

    async delete(request, response) {
        // ao deletar o projeto, tem que deletar todas os requisitos, metricas e metodos
        // que esta ligado a este projeto?
        const { id } = request.params;

        await dbConnection('projetos')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}