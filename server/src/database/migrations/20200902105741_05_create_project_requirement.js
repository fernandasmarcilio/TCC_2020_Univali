
exports.up = function(knex) {
    return knex.schema.createTable('projeto_requisito', table => {
        table.increments('id').primary();

        table.integer('status');
        table.integer('posicao');

        table.integer('id_projeto')
            .notNullable()
            .references('id')
            .inTable('projetos');

        table.integer('id_requisito')
            .notNullable()
            .references('id')
            .inTable('requisitos');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projeto_requisito');
};