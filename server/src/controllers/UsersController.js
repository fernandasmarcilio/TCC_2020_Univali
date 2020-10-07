const db = require('../database/connection');

module.exports = {
    async findUser(request, response) {
        const { usuario } = request.params;

        let id_usuario = await db('usuario')
                            .where({usuario})
                            .select('id');

        if(id_usuario.length === 0) {
            id_usuario = await db('usuario').insert({
                nome: "", 
                email: "", 
                usuario, 
                senha: ""
            })

            id_usuario = id_usuario[0];
        } else {
            id_usuario = id_usuario[0].id;
        }

        return response.status(200).json({ id: id_usuario});
    },

    async create(request, response) {
        const { usuario } = request.body.data;
    
        await db('usuario').insert({
            nome: "", 
            email: "", 
            usuario, 
            senha: ""
        })
    
        return response.send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await db('usuario')
            .where('id', id)
            .delete(); 

        return response.status(204).send();
    }
}
