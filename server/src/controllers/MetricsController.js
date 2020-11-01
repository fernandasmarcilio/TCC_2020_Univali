const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        const metricas = await db('metricas')
            .where('id_usuario', id)
            .select('*');

        return response.json(metricas);
    },

    async show(request, response) {
        const { id } = request.params;
        const trx = await db.transaction();

        try {
            const metricArray = await trx('metricas').select('*').where('id', id);

            const methods = await trx('metrica_metodo')
                .select('metodos.*')
                .where('id_metrica', id)
                .innerJoin('metodos', 'metrica_metodo.id_metodo', 'metodos.id')

            const metric = metricArray[0];

            const data = { ...metric, metodos: methods }
            await trx.commit();

            return response.json(data);
        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while show metrics'
            })
        }
    },

    async create(request, response) {
        const { nome, id_usuario, metodos } = request.body;
        const trx = await db.transaction();

        try {
            const idArray = await trx('metricas').insert({
                nome,
                id_usuario
            })

            const id = idArray[0];

            for (const metodo of metodos) {
                await trx('metrica_metodo').insert({
                    id_metrica: id,
                    id_metodo: metodo
                })
            }

            await trx.commit();
            return response.status(201).json({ id });
        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while create metric'
            })
        }
    },

    async update(request, response) {
        const { nome, metodos } = request.body;
        const { id } = request.params
        const trx = await db.transaction();

        try {
            await trx('metricas')
                .where('id', id)
                .update({
                    nome
                })

            await trx('metrica_metodo')
                .where('id_metrica', id)
                .delete();

            for (const metodo of metodos) {
                await trx('metrica_metodo').insert({
                    id_metrica: id,
                    id_metodo: metodo
                })
            }

            await trx.commit();
            return response.status(201).send();
        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while update metric'
            })
        }
    },

    async delete(request, response) {
        const { id } = request.params;
        const trx = await db.transaction();

        try {
            await trx('metrica_metodo')
                .where('id_metrica', id)
                .delete();

            await trx('requisito_metrica')
                .where('id_metrica', id)
                .delete();

            await trx('metricas')
                .where('id', id)
                .delete();

            await trx.commit();
            return response.status(204).send();
        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while delete metric'
            })
        }
    }
}