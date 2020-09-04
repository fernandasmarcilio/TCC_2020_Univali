
exports.up = function(knex) {
    return knex.schema.createTable('usuario', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('usuario').notNullable();
        table.string('senha').notNullable();
        table.string('avatar');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario');
};
