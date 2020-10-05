const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const metodos = await db('metodos')
                            .select('*');

        return response.json( metodos );
    },

    async create(request, response) {
        const { nome, descricao } = request.body.data;

        await db('metodos').insert({
            nome, 
            descricao
        })
    
        return response.status(201).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('metodos')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}