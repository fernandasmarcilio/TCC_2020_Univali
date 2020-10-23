
exports.up = function(knex) {
    return knex.schema.createTable('requisitos', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        
        table.integer('id_usuario')
        .notNullable()
        .references('id')
        .inTable('usuario');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('requisitos');
};