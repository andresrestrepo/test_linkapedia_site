$(document).ready(function(){
    $('input, textarea').placeholder();
    $(".linkapedia-tools-open-close").click(function(event){
        event.preventDefault();
        $('.linkapedia-navigation').show();
        $('.linkapedia-search').hide();
        if (!$('.linkapedia-tools-panel').is(":visible")){
            openclosetab();
        }
    });

    $(".search").click(function(event){
        event.preventDefault();
        $('.linkapedia-navigation').hide();
        $('.linkapedia-search').show();
        if (!$('.linkapedia-tools-panel').is(":visible")) {
            openclosetab()
        }
    });

    $(".linkapedia-tools-close").click(function(event){
        event.preventDefault();
        openclosetab();
    });

    function openclosetab(){
        $(".linkapedia-tools-panel").animate({width:'toggle'},350, function(){
            $('.linkapedia-tools-panel-right').css("position", "fixed");
            $('.linkapedia-tools-panel-right').css("left", "calc(100% - 100px)");
            if (!$('.linkapedia-tools-panel').is(":visible")){
                $('.linkapedia-tools-panel-right').removeAttr("style");
            }
            $('body').toggleClass('b_overflow');
        });
        $('.linkapedia-tools-panel-right').toggle();
    }
});

