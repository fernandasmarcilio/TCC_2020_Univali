const db = require('../database/connection');
const list = require('../database/defaultData/list');

module.exports = {
    async show(request, response) {
        const { usuario } = request.query;

        const id_usuario = await db('usuario')
                            .where({usuario})
                            .select('id');
        const id = id_usuario[0]

        return response.status(200).json(id);
    },

    async create(request, response) {
        const { usuario} = request.body;
        const trx = await db.transaction();

        try {
            let id_usuario = await trx('usuario').insert({
                email: "", 
                usuario, 
                senha: ""
            })
    
            id_usuario = id_usuario[0];
    
            let map_metodos = new Map();
            let map_metricas = new Map();
    
            for(const metodo of list.metodos){
                const arrayId = await trx('metodos').insert({
                    nome: metodo.nome, 
                    descricao: metodo.descricao,
                    id_usuario
                })
    
                const id = arrayId[0];
                map_metodos.set(metodo.id, id)
            }
    
            for(const metrica of list.metricas){
                const arrayId = await trx('metricas').insert({
                    nome: metrica.nome, 
                    id_usuario
                })
    
                const id = arrayId[0];
                map_metricas.set(metrica.id, id);
                
                for(const metodo of metrica.metodos) {
                        await trx('metrica_metodo').insert({
                        id_metrica: id, 
                        id_metodo: map_metodos.get(metodo)
                    })
                }
            }
    
            for(const requisito of list.requisitos){
                const arrayId = await trx('requisitos').insert({
                    nome: requisito.nome, 
                    id_usuario
                })
                const id = arrayId[0];
    
                for(const metrica of requisito.metricas) {
                    await trx('requisito_metrica').insert({
                        id_requisito: id, 
                        id_metrica: map_metricas.get(metrica)
                    })
                }
            }

            await trx.commit();
            
            return response.status(200).json({ id: id_usuario });
        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new user'
            })
        }
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('usuario')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}
