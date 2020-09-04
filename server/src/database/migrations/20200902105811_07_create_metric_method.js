
exports.up = function(knex) {
    return knex.schema.createTable('metrica_metodo', table => {
        table.increments('id').primary();

        table.integer('id_metrica')
            .notNullable()
            .references('id')
            .inTable('metricas');

        table.integer('id_metodo')
            .notNullable()
            .references('id')
            .inTable('metodos');
            
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('metrica_metodo');
};
