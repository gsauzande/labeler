var knexdb = require('./db.js');
var fs = require('fs');

fs.readFile('my-file.txt', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
});
