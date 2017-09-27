var express = require('express');
var router = express.Router();
var knex = require('../db.js');
//create a data request that makes a query and sends json back to the view
//for updating the rank list
router.get('/', function(req, res, next) {
  res.render('../views/ranking', { title: 'Ranking'});
});
router.get('/data',function(req, res, next){
  knex.select('username','points')
    .from('users')
    .orderBy('points','desc')
    .on('query-error', handleError)
    .then(sendRankings);


    function sendRankings(data) {
      res.json(data);
      knex.destroy();
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
