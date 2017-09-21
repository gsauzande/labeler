require('dotenv').config();
var request = require('request');
var env_vars;
var options = {
  url: 'https://api.heroku.com/apps/gexlabeler/config-vars',
  headers: {
    'Accept': 'application/vnd.heroku+json; version=3',
    'Authorization' : 'Bearer ad38aa1f-441c-48b7-9b72-4f10badc61f4'
  }
};

request(options, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  if(error == null && response.statusCode == 200){
    env_vars = body;
    console.log(env_vars);


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

  }

});
