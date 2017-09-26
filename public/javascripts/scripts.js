$(document).ready(function(){

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
