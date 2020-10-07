const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id_projeto } = request.query;

        const metricMethods = await db('projeto_requisito')
                            .where('id_projeto', id_projeto)
                            .join('requisitos', 'projeto_requisito.id_requisito', '=', 'requisitos.id')
                            .select('*');

        return response.json( metricMethods );
    },

    async create(request, response) {
        const { id_projeto, id_requisito } = request.body.data;

        await db('projeto_requisito').insert({
            id_projeto, 
            id_requisito
        })
    
        return response.status(201).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('projeto_requisito')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}