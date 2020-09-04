
exports.up = function(knex) {
    return knex.schema.createTable('metodos', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('metodos');
};