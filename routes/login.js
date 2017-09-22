/*GET: login form*/
var express = require('express');
var router = express.Router();
var knex = require('../db.js');
var randomstring = require("randomstring");

router.get('/', function(req, res, next) {
  var sessData = req.session;
  sessData.code = randomstring.generate(12);
  res.render('../views/login', { title: 'login',code:sessData.code});
});
router.post('/login', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    knex('users').insert({username:req.body.name,code:req.session.code,points: 0}).then( function (result) {
          console.log(result);     // respond back to request

       });
    res.redirect('/home');
});

module.exports = router;
