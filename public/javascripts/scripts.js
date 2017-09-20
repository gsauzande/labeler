$(document).ready(function(){
  var hasFlip = false;
  $( ".link" ).mouseenter(function() {
    if(!hasFlip){
      $(".link").addClass("flipInX");
      hasFlip = true;
    }
  });

  $( ".link" ).mouseleave(function() {
    if(hasFlip){
      $(".link").removeClass("flipInX");
      hasFlip = false;
    }
  });

//slide up the code
//slide down the code input
//change the register button to an arrow
var reg = true;
$("#register").click(function(){
  if(reg){
    $(".register_code").slideDown();
    $(".login_code").slideUp();
    $("#register").val("x");
    $("#logo_login").hide();
    $("#logo_register").show();
    reg = false;
  }else{
    $(".register_code").slideUp();
    $(".login_code").slideDown();
    $("#register").val("Register");
    $("#logo_login").show();
    $("#logo_register").hide();
    reg = true;
  }


});



});
