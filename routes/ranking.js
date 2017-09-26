var express = require('express');
var router = express.Router();

var knex = require('../db.js');

router.get('/', function(req, res, next) {
    res.render('../views/ranking', { title: 'Rankings'});
});
module.exports = router;
