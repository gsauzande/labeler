
exports.up = function(knex, Promise) {
    return Promise.all([
  knex.schema.createTable('images', function(table){
    table.increments('id').primary();
    table.string('filename');
    table.string('user_code').references('code').inTable('users');
    table.boolean('done');
    table.string('label',100);
    table.timestamps();
  })]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('images')
  ]);
};
