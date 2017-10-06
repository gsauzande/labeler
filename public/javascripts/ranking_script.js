$(document).ready(function(){
  setInterval(requestRankings, 3000);
  requestRankings();
  
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

});
