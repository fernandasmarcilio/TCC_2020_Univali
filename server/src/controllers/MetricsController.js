const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const metricas = await db('metricas')
                            .select('*');

        return response.json( metricas );
    },

    async create(request, response) {
        const { nome, descricao } = request.body;

        await db('metricas').insert({
            nome, 
            descricao
        })
    
        return response.status(201).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await dbConnection('metricas')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}