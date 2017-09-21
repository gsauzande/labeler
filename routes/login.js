/*GET: login form*/
var express = require('express');
var router = express.Router();
var knex = require('../db.js');
var randomstring = require("randomstring");
var code = randomstring.generate(12);
router.get('/', function(req, res, next) {
    res.render('../views/login', { title: 'login',code:code});
});
router.post('/', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    knex('users').insert({username:req.body.name,code:code,points: 0}).then( function (result) {
          console.log(result);     // respond back to request
          res.render('../views/index');
       });
});

module.exports = router;
