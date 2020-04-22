exports.up = function(knex) {
  return knex.schema.createTable('csvdata', (table) => {
    table.increments('id').primary();
    table.string('data').notNullable();
    table.string('header');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('csvdata');
};
