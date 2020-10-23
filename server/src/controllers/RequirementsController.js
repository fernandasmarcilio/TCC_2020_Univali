const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        const requirements = await db('requisitos')
            .where('id_usuario', id)
            .select('*');

        return response.json(requirements);
    },

    async show(request, response) {
        const { id } = request.params;

        const requirementArray = await db('requisitos').select('*').where('id', id);

        const metrics = await db('requisito_metrica')
            .select('metricas.*')
            .where('id_requisito', id)
            .innerJoin('metricas', 'requisito_metrica.id_metrica', 'metricas.id')

        const requirement = requirementArray[0];

        const data = {...requirement, metricas: metrics}

        return response.json(data);
    },

    async create(request, response) {
        const { nome, metricas, id_usuario } = request.body;

        const idArray = await db('requisitos').insert({
            nome,
            id_usuario
        });

        const id = idArray[0];

        metricas.forEach(async (idMetrica) => {
            console.log(idMetrica);
            await db('requisito_metrica').insert({
                id_requisito: id, 
                id_metrica: idMetrica
            })
        });

        return response.status(201).send({ id });
    },

    async update(request, response) {
        const { nome, metricas } = request.body;
        const { id } = request.params

        await db('requisitos')
            .where('id', '=', id)
            .update({
                nome
            })

        await db('requisito_metrica')
            .where('id_requisito', id)
            .delete();

        metricas.forEach(async (idMetrica) => {
            await db('requisito_metrica').insert({
                id_requisito: id, 
                id_metrica: idMetrica
            })
        });

        return response.status(201).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('requisito_metrica')
            .where('id_requisito', id)
            .delete();

        await db('requisitos')
            .where('id', id)
            .delete();

        return response.status(200).send();
    }
}