const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const requirements = await db('requisitos')
                            .select('*');

        return response.json( requirements );
    },

    async create(request, response) {
        const { nome, descricao } = request.body.data;

        const idArray = await db('requisitos').insert({
            nome, 
            descricao
        });

        const id = idArray[0];
    
        return response.status(201).send({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        
        await db('requisitos')
            .where('id', id)
            .delete(); 

        return response.status(200).send();
    }
}