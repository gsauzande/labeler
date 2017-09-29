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
router.post('/register',function(req, res, next) {
    req.checkBody('name', 'Name cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if(errors){
      console.log('Errors : ' + JSON.stringify(errors));
      res.render('../views/error',{ message: errors[0].msg});
    }else{
      //check for the same code in the db
        knex('users').insert({username:req.body.name,code:req.session.code,points: 0}).then( function (result) {
              console.log(result);     // respond back to request
           });
        res.redirect('/home');
    }


  }

);

module.exports = router;
