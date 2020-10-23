const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;
        
        const metodos = await db('metodos')
                            .where('id_usuario', id)
                            .select('*');

        return response.json( metodos );
    },

    async show(request, response) {
        const { id } = request.params;

        const methodArray = await db('metodos').select('*').where('id', id);

        const method = methodArray[0];
        
        return response.json({...method});
    },

    async create(request, response) {
        const { nome, descricao, id_usuario } = request.body;

        await db('metodos').insert({
            nome, 
            descricao,
            id_usuario
        })
    
        return response.status(201).send();
    },

    async update(request, response) {
        const { nome, descricao } = request.body;
        const { id } = request.params

        await db('metodos')
            .where('id', '=', id)
            .update({
                nome,
                descricao,
            })

        return response.status(201).send();
    },

    async delete(request, response) {
        const { id } = request.params;
        
        await db('metrica_metodo')
            .where('id_metodo', id)
            .delete(); 

        await db('metodos')
            .where('id', id)
            .delete();
        
        return response.status(204).send();
    }
}