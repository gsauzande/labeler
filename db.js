require('dotenv').config();
// var mysql = require('mysql');
// //connect to the db
// var connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: '8889',
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// });
// connection.connect();

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    port : process.env.DB_PORT,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }
});
module.exports = knex;
