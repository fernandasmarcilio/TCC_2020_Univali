const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id_usuario, id_projeto } = request.query;

        const projects = !id_projeto ? 
            await db('projetos')
                .where('id_usuario', id_usuario)
                .select('*')
            :
            await db('projetos')
            .where('id_usuario', id_usuario)
            .where('id', id_projeto)
            .select('*')
        

        return response.status(200).json( projects );
    },

    async create(request, response) {
        const { nome, descricao } = request.body.data;
        const { id_usuario } = request.query;

        await db('projetos').insert({
            nome, 
            descricao,
            id_usuario
        })
    
        return response.status(201).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('projetos')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}