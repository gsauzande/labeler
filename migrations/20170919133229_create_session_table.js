
exports.up = function(knex, Promise) {
    return Promise.all([
  knex.schema.createTable('session', function(table){
    table.string('session_id').primary();
    table.dateTime('login');
    table.dateTime('logout');
    table.integer('labeled_images');
    table.string('user_code').references('code').inTable('users');
    table.timestamps();
  })]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('session')
  ]);
};
