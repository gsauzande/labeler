$(document).ready(function(){

  var reg = true;
  requestRankings();
  setInterval(requestRankings, 3000);

  $("#register").click(function(){
    if(reg){
      showLoginCodeInput();
      reg = false;
    }else{
      hideLoginCodeInput();
      reg = true;
    }
  });

  function requestRankings(){
    $.ajax({
         url: '/ranking/data',
         type: "GET",
         dataType: "json",
         contentType: "application/json",
         success: printRows.bind(rows=null),
         error:handleError.bind(jqXHR=null, textStatus=null, errorThrown=null)
     });
  }


   function printRows(rows) {
     $(".rank_box").empty();
     rows.forEach(function(element) {
        $(".rank_box")
        .append("<div class='rank_item'><span class='username'>"+element.username+"</span><span class='points'>"+element.points+"</span></div>");
      });
   }

   function handleError(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown.status);
   }

   function showLoginCodeInput(){
     $(".register_code").slideDown();
     $(".login_code").slideUp();
     $("#register").val("x");
     $("#logo_login").hide();
     $("#logo_register").show();
     $(".auth_form").attr('action','/login');
     $(".login_btn").val("Login");
   }

   function hideLoginCodeInput(){
     $(".register_code").slideUp();
     $(".login_code").slideDown();
     $("#register").val("Register");
     $("#logo_login").show();
     $("#logo_register").hide();
     $(".auth_form").attr('action','/register');
     $(".login_btn").val("Register");
   }

});
