$(document).ready(function () {
    $('.accordion-container').on('click', '.box p', onClickNextBox);
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

function getNextBox(urlNext, level) {
    $.ajax({
        url: urlNext,
        dataType: 'json',
        async: false
    }).done(function (res) {
        var json = parseJsonHalToBox(res);
        var container = $('<div>').addClass('box').attr('level', ++level), box = $('<div>');

        if (json.urlmore) {
            container.append($('<div>').text('more').attr('url-more', json.urlmore));
        }

        $.each(json.items, function (i, item) {
            box.append($('<p>').text(item.name).attr('url-next', item.urlnext));
        });

        $('.accordion-container').append(container.append(box));
    }).fail(function (err) {});
}

function parseJsonHalToBox(res) {
    var box = {}, href;
    box.urlmore = res._links.next ? res._links.next.href : undefined;
    for(var key in res._embedded)if(/taxonomies|topics/.test(key))box.items = res._embedded[key];

    $.each(box.items, function(i){
        for(var key in box.items[i]._links)if(/discussions|topics|documents/.test(key))href = box.items[i]._links[key].href;
        box.items[i].urlnext = href;
    });

    return box;
}
