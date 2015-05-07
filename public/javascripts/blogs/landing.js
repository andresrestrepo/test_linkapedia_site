$(document).ready(function(){
    $('.accordion-container').on('click', '.box p', onClickNextBox);
});

function onClickNextBox(){
    var urlNext = $(this).attr('url-next');
    var parent = $(this).parent().parent();
    var level = parseInt(parent.attr('level'));

    parent.nextAll('.box').remove();

    if(level === 4){
        alert('go to')
    }else{
        getNextBox(urlNext, level);
    }
}

function getNextBox(urlNext, level){
    $.ajax({
        url:urlNext,
        dataType:'json',
        async: false
    }).done(function(res){
        var json = parseJsonHalToBox(res, ++level);
        var container = $('<div>').addClass('box level' + level).attr('level', level), box = $('<div>');

        if(json.urlmore){
            container.append($('<div>').text('more').attr('url-more', json.urlmore));
        }

        $.each(json.items, function(i, item){
            box.append($('<p>').text(item.name).attr('url-next', item.urlnext));
        });

        $('.accordion-container').append(container.append(box));
    }).fail(function(err){});
}

function parseJsonHalToBox(res, level){
    var box = {};

    var getItemsWithUrlNext = function(key, items){
        var i, size = items.length;
        for(i = 0; i < size; i++){
            items[i].urlnext = items[i]._links[key].href;
        }
        return items;
    };

    if(res._links.next){
        box.urlmore = res._links.next.href;
    }

    switch(level){
        case 1: box.items = getItemsWithUrlNext('taxonomies', res._embedded.domains);
            break;
        case 2: box.items = getItemsWithUrlNext('discussions', res._embedded.taxonomies);
            break;
        case 3: box.items = getItemsWithUrlNext('topics', res._embedded.topics);
            break;
        case 4: box.items = getItemsWithUrlNext('documents', res._embedded.topics);
            break;
    }

    return box;
}