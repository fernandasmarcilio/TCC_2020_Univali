
exports.up = function(knex) {
    return knex.schema.createTable('usuario', table => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('usuario').notNullable();
        table.string('senha').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario');
};
