const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id_metrica } = request.query;

        const metricMethods = await db('metrica_metodo')
                            .where('id_metrica', id_metrica)
                            .join('metodos', 'metrica_metodo.id_metodo', '=', 'metodos.id')
                            .select('*');

        return response.json( metricMethods );
    },

    async create(request, response) {
        console.log(request.body); 
        const { id_metrica, id_metodo } = request.body;

        const idArray = await db('metrica_metodo').insert({
            id_metrica, 
            id_metodo
        })

        const id = idArray[0]
    
        return response.status(201).send({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('metrica_metodo')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}