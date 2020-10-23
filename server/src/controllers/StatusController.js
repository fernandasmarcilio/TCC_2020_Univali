const db = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { id } = request.params;
    const { status } = request.query;

    let res = [];
    
    if(status) {
      let parseStatus = parseInt(JSON.parse(status));
      parseStatus = parseStatus === -1 ? null : parseStatus; 

      res = await db('projeto_requisito')
        .select('requisitos.*', 'projeto_requisito.id as id_status', 'projeto_requisito.status', 'projeto_requisito.posicao')
        .where('id_projeto', id)
        .where('projeto_requisito.status', parseStatus)
        .innerJoin('requisitos', 'projeto_requisito.id_requisito','requisitos.id')
    }else {
      res = await db('projeto_requisito')
      .select('requisitos.*', 'projeto_requisito.id as id_status', 'projeto_requisito.status', 'projeto_requisito.posicao')
      .where('id_projeto', id)
      .innerJoin('requisitos', 'projeto_requisito.id_requisito', 'requisitos.id')
    }

    return response.json(res);
  },

  async show(request, response) {
    const { id } = request.params;

    const res = await db('projeto_requisito')
      .select('requisitos.*', 'projeto_requisito.id as id_status', 'projeto_requisito.status', 'projeto_requisito.posicao')
      .where('id_projeto', id)
      .innerJoin('requisitos', 'projeto_requisito.id_requisito', 'requisitos.id')

    const listBoard = ['A fazer', 'Fazendo', 'A testar', 'Testando', 'Aprovado'].map((item, index) => {
      const cards = res.filter(requirement => requirement.status === index);

      return {
        id: index,
        title: item,
        creatable: index === 0 ? true : false,
        cards
      }
    })

    return response.json(listBoard);
  },

  async create(request, response) {
    const { requirements } = request.body;
    const { id } = request.params;

    requirements.forEach(async (idRequirement) => {
      await db('projeto_requisito').insert({
        id_projeto: id,
        id_requisito: idRequirement,
        status: 0,
        posicao: null,
      })
    });

    return response.status(201).send();
  },

  async update(request, response) {
    const { status, posicao } = request.body;
    const { idProject, idStatus } = request.params;

    await db('projeto_requisito')
      .where('id', idStatus)
      .where('id_projeto', idProject)
      .update({ status, posicao })

    return response.status(201).send();
  },
}
