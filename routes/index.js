//server
var express = require('express');
var router = express.Router();
var fs = require('fs');
var image_path = "public/images/";
var folder = "grapes";
var builder = require('xmlbuilder');
var knex = require('../db.js');
var batch_size = 10;


router.get('/', function(req, res, next) {
  batch(batch_size,req.session.code,function(_batch){
    var filenames = _batch;
    console.log(filenames);
    res.render('../views/index', { title: 'labeler' ,files:filenames.splice(0,9)});
  });

});

router.get('/first', function(req, res, next) {
  batch(batch_size,req.session.code,function(_batch){
    var filenames = _batch;
    res.send (filenames[0]);
  });

});

//This post request should also chnage the index of the first item(this increments)
router.post('/xml', function(req, res, err) {
  batch(batch_size,req.session.code,function(_batch){
    var filenames =  _batch;
    var data = req.body;
    var new_filename = filenames[0].slice(0,-4) + '.xml';
    var new_path = image_path + 'grapes_info/';
    data = JSON.parse(data);

    fs.writeFile(new_path + new_filename , make_xml(data), (err) => {
    console.log('Filename : ' + new_filename);
    if (err){
      console.log('Status : ' + err);
      res.status(500).end('Oops! An Internal Server Error ocurred');
    }
    console.log('Status : saved');
  });
  res.end("200 OK");
  });


});

/**
 * This function takes in a JSON and it plugs it in
 * a pre-made XML structure
 * @method make_xml
 * @param  {[object]} data JSON
 * @return {[xml]}      [description]
 */
function make_xml(data){
  var xml;
  var file_structure = {
  "annotation": {
    "folder": folder,
    "filename": "85963773_8cff301793.jpg",
    "path": image_path,
    "source": { "database": "Unknown" },
    "size": {
      "width": "0",
      "height": "0",
      "depth": "0"
    },
    "segmented": "0",
    "object": []
  }
};
data.values.forEach(function(element){
  file_structure.annotation.object.push(element);
});
xml = builder.create(file_structure);
return xml;
}
//Select a batch of 10 image ids who don't have a user_code

//->store the filenames in an array.
//This is the batching process now a function returns the batch.
//Signature is batch(user_code,size)
function batch(size,code,callback){
  //Select a batch of 10 image ids who don't have a user_code
  var batch_;
  knex.select('id','filename').from('images').where('user_code', null).then(function(data) {
    batch_ = data;
      //loop through this array and on each loop alter the data in the database to fill the user_code
    for (var i = 0; i < batch_.length; i++) {
      console.log(code);
      knex.raw('update `images` set user_code=?  where id = ?',[code,batch_[i].id]).then(function(resp) {
        console.log(batch_[i].filename);
      });

    }
    callback(batch_);

  });
  knex.destroy();

  return null;
}

module.exports = router;
