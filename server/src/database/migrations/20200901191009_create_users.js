
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('avatar');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
