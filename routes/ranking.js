var express = require('express');
var router = express.Router();
var knex = require('../db.js');

router.get('/', function(req, res, next) {
  
  knex.select('username','points')
    .from('users')
    .orderBy('points','desc')
    .on('query-error', handleError)
    .then(sendRankings);


    function sendRankings(data) {
      res.render('../views/ranking', { title: 'Ranking',users : data});
    }

    function handleError(error, obj) {
      if(req.app.get('env') === 'development'){
        res.render('../views/error', {message: 'Sorry, our bad. This is not your fault...', error : error});
      }else{
        res.render('../views/error', {message: 'Sorry, our bad. This is not your fault...', error : {}});
      }

    }


});



module.exports = router;
