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
        const trx = await db.transaction();

        try {
            const requirementArray = await trx('requisitos').select('*').where('id', id);

            const metrics = await trx('requisito_metrica')
                .select('metricas.*')
                .where('id_requisito', id)
                .innerJoin('metricas', 'requisito_metrica.id_metrica', 'metricas.id')

            const requirement = requirementArray[0];

            const data = { ...requirement, metricas: metrics }

            await trx.commit();

            return response.json(data);


        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while show requirements'
            })
        }
    },

    async create(request, response) {
        const { nome, metricas, id_usuario } = request.body;
        const trx = await db.transaction();

        try {
            const idArray = await trx('requisitos').insert({
                nome,
                id_usuario
            });

            const id = idArray[0];

            for (const metrica of metricas) {
                await trx('requisito_metrica').insert({
                    id_requisito: id,
                    id_metrica: metrica
                })
            }

            await trx.commit();
            return response.status(201).send({ id });
        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while create requirement'
            })
        }
    },

    async update(request, response) {
        const { nome, metricas } = request.body;
        const { id } = request.params
        const trx = await db.transaction();

        try {
            await trx('requisitos')
                .where('id', '=', id)
                .update({
                    nome
                })

            await trx('requisito_metrica')
                .where('id_requisito', id)
                .delete();

            for (const metrica of metricas) {
                await trx('requisito_metrica').insert({
                    id_requisito: id,
                    id_metrica: metrica
                })
            }

            await trx.commit();
            return response.status(201).send();
        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while update requirement'
            })
        }
    },

    async delete(request, response) {
        const { id } = request.params;
        const trx = await db.transaction();

        try {
            await trx('requisito_metrica')
                .where('id_requisito', id)
                .delete();

            await trx('requisitos')
                .where('id', id)
                .delete();
            await trx.commit();
            return response.status(200).send();
            
        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while delete requirement'
            })
        }
    }
}