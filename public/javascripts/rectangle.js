$(document).ready(function(){
// get references to the canvas and context
var canvas = document.getElementById("rect_box");
var ctx = canvas.getContext("2d");

// style the context
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;

// calculate where the canvas is on the window
// (used to help calculate mouseX/mouseY)
var $canvas = $("#rect_box");
// this flag is true when the user is dragging the mouse
var isDown = false;

// these vars will hold the starting mouse position
var startX;
var startY;
var width;
var height;
var serverLocation = "http://localhost:3000/";
var currentImage = '';
var label = 'grapes';
class Rectangle {
  constructor(_startX, _startY, _width, _height) {
    this.startX = _startX;
    this.startY = _startY;
    this.height = _height;
    this.width = _width;
  }
  draw(){
    ctx.strokeRect(this.startX, this.startY, this.width, this.height);
  }
}

  var rectangles = {
    'label' : label,
    'values' : []
  };

function imgChange(imagePath) {
        var c = document.getElementById("picture_box");
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0);
        };
        img.src = "images/resized_800x450/" + imagePath;
}

$("#btnNext").click(function(){
    get_next_image();
    send_xml();
});

function send_xml(){
  console.log(JSON.stringify(rectangles));
  $.ajax({
       url: serverLocation + 'xml',
       type: "POST",
       dataType: "text",
       contentType: "text/plain",
       data: JSON.stringify(rectangles),
       success: function (response) {
          console.log(response);

       },
       error: function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
       }
   });

}

function get_next_image(){
  $.ajax({
  url: serverLocation + 'first',
  type: 'GET',
  success: function(data){
    currentImage = data;
    imgChange(currentImage);
  },
  error: function(err) {
      console.log(err);
  }
});
}

//calling for when the app loads
get_next_image();

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    coordinates = getMousePos(canvas,e);
    // save the starting x/y of the rectangle
    startX = coordinates.x;
    startY = coordinates.y;
    // set a flag indicating the drag has begun
    isDown = true;
}

function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
    rectangle = new Rectangle(startX, startY, width, height);
    rectangles.values.push(rectangle);
    // the drag is over, clear the dragging flag
    isDown = false;
}

function handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
}

function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    // if we're not dragging, just return
    if (!isDown) {
        return;
    }
    coordinates = getMousePos(canvas,e);
    // get the current mouse position
    mouseX = coordinates.x;
    mouseY = coordinates.y;

    // Put your mousemove stuff here

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    width = mouseX - startX;
    height = mouseY - startY;

    imgChange(currentImage);
    ctx.strokeRect(startX, startY, width, height);
    rectangles.values.forEach(function(element){
      element.draw();
    });


}

// listen for mouse events
$("#rect_box").mousedown(function (e) {
    handleMouseDown(e);
});
$("#rect_box").mousemove(function (e) {
    handleMouseMove(e);
});
$("#rect_box").mouseup(function (e) {
    handleMouseUp(e);
});
$("#rect_box").mouseout(function (e) {
    handleMouseOut(e);
});
});
