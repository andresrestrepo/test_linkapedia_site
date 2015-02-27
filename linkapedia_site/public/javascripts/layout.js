$(document).ready(function(){
    $('input, textarea').placeholder();
    $(".menu-icon").click(function(event){
        event.preventDefault();
        $('.general-menu').show();
        $('.general-search').hide();
        if (!$('.slide-panel').is(":visible")){
            openclosetab();
        }
    });

    $(".search-icon").click(function(event){
        event.preventDefault();
        $('.general-menu').hide();
        $('.general-search').show();
        if (!$('.slide-panel').is(":visible")) {
            openclosetab()
        }
    });

    $(".close-slide-panel-icon").click(function(event){
        event.preventDefault();
        openclosetab();
    });

    function openclosetab(){
        var barRightSide = $('.bar-right-side');
        $(".slide-panel").animate({width:'toggle'},350, function(){
            barRightSide.css("position", "fixed");
            barRightSide.css("left", "calc(100% - 100px)");
            if (!$('.slide-panel').is(":visible")){
                $('.bar-right-side').removeAttr("style");
            }
            $('body').toggleClass('b_overflow');
        });
        barRightSide.toggle();
    }
});

