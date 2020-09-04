
exports.up = function(knex) {
    return knex.schema.createTable('requisito_metrica', table => {
        table.increments('id').primary();

        
        table.integer('id_requisito')
        .notNullable()
        .references('id')
        .inTable('requisitos');
        
        table.integer('id_metrica')
            .notNullable()
            .references('id')
            .inTable('metricas');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('requisito_metrica');
};