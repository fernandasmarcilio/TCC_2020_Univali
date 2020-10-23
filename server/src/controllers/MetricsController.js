const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        const metricas = await db('metricas')
                        .where('id_usuario', id)
                        .select('*');

        return response.json( metricas );
    },

    async show(request, response) {
        const { id } = request.params;

        const metricArray = await db('metricas').select('*').where('id', id);

        const methods = await db('metrica_metodo')
            .select('metodos.*')
            .where('id_metrica', id)
            .innerJoin('metodos', 'metrica_metodo.id_metodo', 'metodos.id')

        const metric = metricArray[0];

        const data = {...metric, metodos: methods}

        return response.json(data);
    },

    async create(request, response) {
        const { nome, id_usuario, metodos } = request.body;

        const idArray = await db('metricas').insert({
            nome,
            id_usuario
        })

        const id = idArray[0];

        metodos.forEach(async (idMetodo) => {
            await db('metrica_metodo').insert({
                id_metrica: id, 
                id_metodo: idMetodo
            })
        });
    
        return response.status(201).json({ id });
    },

    async update(request, response) {
        const { nome, metodos } = request.body;
        const { id } = request.params

        await db('metricas')
            .where('id', id)
            .update({
                nome
            })

        await db('metrica_metodo')
            .where('id_metrica', id)
            .delete();

            metodos.forEach(async (idMetodo) => {
            await db('metrica_metodo').insert({
                id_metrica: id, 
                id_metodo: idMetodo
            })
        });

        return response.status(201).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('metrica_metodo')
        .where('id_metrica', id)
        .delete();

        await db('requisito_metrica')
        .where('id_metrica', id)
        .delete(); 

        await db('metricas')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}