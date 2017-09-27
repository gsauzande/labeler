var express = require('express');
var router = express.Router();
var knex = require('../db.js');

router.get('/', function(req, res, next) {
  req.session.rankings = null;
  res.render('../views/ranking', { title: 'Ranking'});
});
router.get('/data',function(req, res, next){
  knex.select('username','points')
    .from('users')
    .orderBy('points','desc')
    .limit(10)
    .on('query-error', handleError)
    .then(sendRankings);


    function sendRankings(data) {
     if(arraysEqual(data, req.session.rankings)){
       res.end();
     }else{
       res.json(data);
     }

    }

    function handleError(error, obj) {
      if(req.app.get('env') === 'development'){
        res.render('../views/error', {message: 'Sorry, our bad. This is not your fault...', error : error});
      }else{
        res.render('../views/error', {message: 'Sorry, our bad. This is not your fault...', error : {}});
      }

    }

    function arraysEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }
});



module.exports = router;
