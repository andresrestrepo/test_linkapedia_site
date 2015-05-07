$(window).load(function(){
    //$("[level]").mCustomScrollbar();
});

$(document).ready(function () {
    $('.accordion-container').on('click', '.box p', onClickNextBox);
    $('.accordion-container').on('click', '.box [url-more] span.glyphicon-chevron-down', onClickMore);
});

function onClickNextBox() {
    var urlNext = $(this).attr('url-next');
    var parent = $(this).parent().parent();
    var level = parseInt(parent.attr('level'));
    parent.nextAll('.box').remove();

    if (level === 4) {
        alert('go to')
    } else {
        getNextBox(urlNext, level);
    }
}

function onClickMore() {
    var that = $(this);
    that.removeClass('glyphicon-chevron-down').addClass('glyphicon-refresh refresh-animate');

    $.ajax({
        url:that.parent().attr('url-more'),
        dataType:'json'
    }).done(function(res){
        var items = getItemsFromResponse(res);
        var box = that.parent().siblings('div');

        $.each(items, function(i, item){
            box.append($('<p>').text(item.name).attr('url-next', getHrefFromItem(item)));
        });

        if(res._links.next){
            that.addClass('glyphicon-chevron-down').removeClass('glyphicon-refresh refresh-animate')
            that.parent().attr('url-more', res._links.next.href);
        }else{
            that.remove();
        }
    }).fail(function(err){});
}

function getNextBox(urlNext, level) {
    $.ajax({
        url: urlNext,
        dataType: 'json',
        async: false
    }).done(function (res) {
        var json = parseJsonHalToBox(res);
        var container = $('<div>').addClass('box').attr('level', ++level), box = $('<div>');

        $.each(json.items, function (i, item) {
            box.append($('<p>').text(item.name).attr('url-next', item.urlnext));
        });

        container.append(box);

        if (json.urlmore) {
            container.append($('<div><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></div>').attr('url-more', json.urlmore));
        }

        $('.accordion-container').append(container);
    }).fail(function (err) {
    });
}

function parseJsonHalToBox(res) {
    var box = {}, href;
    box.urlmore = res._links.next ? res._links.next.href : undefined;
    box.items = getItemsFromResponse(res);

    $.each(box.items, function (i) {
        box.items[i].urlnext = getHrefFromItem(box.items[i]);
    });

    return box;
}

function getItemsFromResponse(res){
    for (var key in res._embedded)if (/domains|taxonomies|topics/.test(key))return res._embedded[key];
}

function getHrefFromItem(item){
    for (var key in item._links)if (/discussions|topics|documents/.test(key))return item._links[key].href;
}