function popup(popupId){
    var divBlackBackground = $("<div>").attr("id", "linka-popup-background");
    var body = $('body');
    body.append(divBlackBackground);
    divBlackBackground.show();
    var divPopUp = $("#"+popupId);
    divPopUp.fadeIn(500);
    body.toggleClass('b_overflow');
    var a = $("<a>").text("Ok").attr("href", "#").attr("id", "close-popup");
    a.click(function(evt){
        evt.preventDefault();
        popupClose(popupId);
    });
    divPopUp.append($("<br>")).append(a);
    var x = divPopUp.height() / 2;
    divPopUp.css("top", "calc(50% - "+x+"px)");
}


function popupClose(popupId){
    $("#"+popupId).fadeOut(500, function(){
        $("#linka-popup-background").remove();
        $("#"+popupId).children($("<a>")).remove();
        $('body').toggleClass('b_overflow');
    });
}