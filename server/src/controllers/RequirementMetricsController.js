const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id_requisito } = request.query;

        const requirementMetrics = await db('requisito_metrica')
                            .where('id_requisito', id_requisito)
                            .join('metricas', 'requisito_metrica.id_metrica', '=', 'metricas.id')
                            .select('*');

        return response.json( requirementMetrics );
    },

    async create(request, response) {
        const { id_requisito, id_metrica } = request.body;

        const id = await db('requisito_metrica').insert({
            id_requisito, 
            id_metrica
        })
        
        return response.status(201).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('requisito_metrica')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}