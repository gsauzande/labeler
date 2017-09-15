//server
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = "public/images/";
var folder = "grapes";
var filenames = [];
var builder = require('xmlbuilder');

path += folder;

fs.readdir(path, function(err, items) {
    filenames = items;
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'labeler' ,files:filenames.splice(0,9)});
});

router.get('/first', function(req, res, next) {
  res.send (filenames[0]);
});

router.post('/xml', function(req, res, err) {
  var data = req.body;

  data = JSON.parse(data);
  console.log(data);

  fs.writeFile('test.xml', make_xml(data), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
//res.end(JSON.parse("received"));

});
/**
 * This function takes in a JSON and it plugs it in
 * a pre-made XML structure
 * @method make_xml
 * @param  {[object]} data JSON
 * @return {[xml]}      [description]
 */
function make_xml(data){
  //take in the data
  //change the var xml to fit this -> structure
  //change the object on the side to a json
  //Creating the skeleton object and plugging in the data
  var file_structure = {
  "annotation": {
    "folder": folder,
    "filename": "85963773_8cff301793.jpg",
    "path": "D:/MyFiles/Datasets/grapes/85963773_8cff301793.jpg",
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
  console.log(element);
  file_structure.annotation.object.push(element);
});

var xml = builder.create(file_structure);
return xml;
}
//xml builder and that plugs in the values into a pre-made structure and then saves it to memory
//This post request should also chnage the index of the first item(this increments)

module.exports = router;
