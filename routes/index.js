//server
var express = require('express');
var router = express.Router();
var fs = require('fs');
var image_path = "public/images/";
var folder = "grapes";
var builder = require('xmlbuilder');
var knex = require('../db.js');
var batch_size = 10;


router.get('/',function(req, res, next) {
  // if(req.session.usercode){
  //   batch(batch_size,req.session.usercode,function(_batch){
  //     var filenames = _batch;
  //     console.log(filenames);
 //res.render('../views/index', { title: 'labeler' ,files:filenames.splice(0,9), user_code:req.session.usercode});
 res.render('../views/index', { title: 'labeler' ,files:[], user_code:req.session.usercode});

  //   });
  // }else{
  //   res.render('error',{ message: 'Please login ', logged_out : true});
  // }
});

router.get('/logout', function(req, res){
   var user_code = req.session.usercode;
   req.session.destroy(function(){
      console.log("user "+ user_code + " logged out.");
   });
   res.redirect('/');
});

router.get('/first', function(req, res, next) {
  //console.log("GO***" + req.session.batch[0]);
  if(typeof(req.session.batch) == 'undefined'){
    //if there is nothin on the batch then call the function to make one. If there already is then remove the first item
    console.log(batch_size,req.session.usercode);
    batch(batch_size,req.session.usercode);

  }else{
    console.log("There");
    req.session.batch.shift();
  }
  //res.send();
  function batch(size,code){
    var batch_arr = [];
    knex.select('id','filename').from('images').whereNull('user_code').then(function(data) {
    data.forEach(function(element){
      knex.raw('update `images` set user_code=?  where id = ?',[code,element.id]).then(function(resp) {
        console.log("batch_arr len : " + batch_arr.length);
        //call a function that adds stuff to batch and when it hits 10 it sends data back
        batch_arr.push(element.filename);
        if(batch_arr.length == 10){
          console.log("send back");
          req.session.batch = batch_arr;
          console.log(batch_arr);
          res.send(req.session.batch);
          throw BreakException;
        }
      });
    });



    });
  }
//  console.log("YO***" + req.session.batch[0]);


});

//This post request should also chnage the index of the first item(this increments)
router.post('/xml', function(req, res, err) {
  batch(batch_size,req.session.usercode,function(_batch){
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



module.exports = router;
