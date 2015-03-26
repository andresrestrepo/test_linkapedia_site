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
            openclosetab();
        }
    });

    $(".close-slide-panel-icon").click(function(event){
        event.preventDefault();
        openclosetab();
    });

    function openclosetab(){
        $('body').toggleClass('b_overflow');
        $('.bar-right-side').toggle();
        $(".slide-panel").animate({width:"toggle"},350, function(){
        });
    }
});

