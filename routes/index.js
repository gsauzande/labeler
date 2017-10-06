//server
var express = require('express');
var router = express.Router();
var fs = require('fs');
var image_path = "public/images/";
var folder = "grapes";
var xmlbuilder = require('xmlbuilder');
var knex = require('../db.js');
var batch_size = 10;


router.get('/',function(req, res, next) {
 res.render('../views/index', { title: 'labeler' ,files:[], user_code:req.session.usercode});
});

router.get('/logout', function(req, res){
   var user_code = req.session.usercode;
   req.session.destroy(function(){
      console.log("user "+ user_code + " logged out.");
   });
   res.redirect('/');
});

router.get('/first', function(req, res, next) {
  if(typeof(req.session.batch) == 'undefined'){
    batch(batch_size,req.session.usercode);

  }else{
    req.session.batch.shift();
    res.send(req.session.batch);
  }
  function batch(size,code){
    var batch_arr = [];
    knex.select('id','filename','label').from('images').whereNull('user_code').then(function(data) {
    for(var i = 0;i < 10; i++){
      var batch_item = {};
      knex.raw('update `images` set user_code=?  where id = ?',[code,data[i].id]).then(function(resp) {
        batch_item.filename = data[i].filename;
        batch_item.label = data[i].label;
        batch_arr.push(batch_item);
        req.session.batch = batch_arr;
        if(batch_arr.length == 10){
          res.send(req.session.batch);
          batch_arr = [];
        }

      });
    }



    });
  }
});

//This post request should also chnage the index of the first item(this increments)
//keep the batch index of the current item being labeled
router.post('/xml', function(req, res, err) {
    var data = req.body;
    var new_filename = 'car.xml';
    knex('xml_data').insert({data: data,user_code:req.session.usercode}).then(function(){
      res.end("200 OK");
    });
res.end("200 OK");

});

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
  xml = xmlbuilder.create(file_structure);
  return xml;
}

module.exports = router;
