const db = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id_usuario, id_projeto } = request.query;

        const projects = !id_projeto ? 
            await db('projetos')
                .where('id_usuario', id_usuario)
                .select('*')
            :
            await db('projetos')
            .where('id_usuario', id_usuario)
            .where('id', id_projeto)
            .select('*')
        

        return response.status(200).json( projects );
    },

    async show(request, response) {
        const { id } = request.params;

        const projectArray = await db('projetos').select('*').where('id', id);

        const project = projectArray[0];
        
        return response.json({...project});
    },

    async create(request, response) {
        const { nome, descricao } = request.body;
        const { id_usuario } = request.query;

        const idArray = await db('projetos').insert({
            nome, 
            descricao,
            id_usuario
        })

        const id_projeto = idArray[0];

    
        return response.status(201).send();
    },

    async update(request, response) {    
        const { nome, descricao } = request.body;
        const { id } = request.params;

        await db('projetos')
        .where('id', '=', id)
        .update({
            nome, 
            descricao,
        })
    
        return response.status(201).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('projetos')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}