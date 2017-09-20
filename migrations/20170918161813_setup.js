exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.string('username');
      table.string('code').primary();
      table.integer('points');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
