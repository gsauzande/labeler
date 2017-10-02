/*GET: login form*/
var express = require('express');
var router = express.Router();
var knex = require('../db.js');
var randomstring = require("randomstring");
var user = {
  name : null,
  code : null
};


router.get('/', function(req, res, next) {
  var sessData = req.session;
  sessData.code = randomstring.generate(12);
  res.render('../views/login', { title: 'login',code:sessData.code});
});
router.post('/register',function(req, res, next) {
    //validate_fields([req.body.name]);
    knex('users')
    .insert({username:req.body.name,code:req.session.code,points: 0})
    .then(send_home);

    function send_home(){
      req.session.username = element.username;
      req.session.usercode = element.code;
      return res.redirect('/home');
     }

  });

  router.post('/login',function(req, res, next) {
      //validate_fields([req.body.name,req.body.unique_login_code]);
      req.checkBody('name', 'Please fill in your name').notEmpty();
      req.checkBody('unique_login_code', 'Please fill in your unique code').notEmpty();
      var errors = req.getValidationResult();
      if(JSON.stringify(errors) != '{}') return res.render('../views/error',{ message: errors[0].msg});
      knex.select('username','code')
      .from('users')
      .where({code: req.body.unique_login_code,username: req.body.name})
      .then(function accept_login(rows){
        //loop through data
        console.log(rows);
        if(typeof(rows) == 'undefined'){
          res.render('../views/error',{ message: "This code does not exist on our database"});
        }else{
          req.session.username = rows[0].username;
          req.session.usercode = rows[0].code;


          res.redirect('/home');
        }

      });

      function reject_login(){
        //check for error and render the same page with an error message

      }

    }

);
module.exports = router;
