
exports.up = function(knex) {
    return knex.schema.createTable('metodos', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('descricao').notNullable();

        table.integer('id_usuario')
        .notNullable()
        .references('id')
        .inTable('usuario');
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('metodos');
};