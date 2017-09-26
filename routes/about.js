var express = require('express');
var router = express.Router();

var knex = require('../db.js');

router.get('/', function(req, res, next) {
    res.render('../views/about', { title: 'About Us'});
});
module.exports = router;
