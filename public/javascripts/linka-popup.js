function popup(popupId){
    var div = $("<div>");
    div.attr("id", "linka-popup-background");
    $('body').append(div);
    div.show();

    $("#"+popupId).fadeIn(500);
    $('body').toggleClass('b_overflow');

    var a = $("<a>").text("Ok").attr("href", "#").attr("id", "close-popup");
    a.click(function(evt){
        evt.preventDefault();
        popupClose(popupId);
    })
    $("#"+popupId).append($("<br>")).append(a);
    var x = $('#'+popupId).height() / 2;
    $("#"+popupId).css("top", "calc(50% - "+x+"px)");
}


function popupClose(popupId){
    $("#"+popupId).fadeOut(500, function(){
        $("#linka-popup-background").remove();
        $("#"+popupId).children($("<a>")).remove();
        $('body').toggleClass('b_overflow');
    });


}