$(window).load(function () {
    $("[level]").mCustomScrollbar({
        live: "on",
        scrollInertia: 500,
        scrollbarPosition: "outside"
    });
});

$(document).ready(function () {
    $('.accordion-container')
        .on('click', '.box span p', onClickNextBox)
        .on('click', '.box [url-more] span.glyphicon-chevron-down', onClickMore);

    $('.menu-icon').click(function () {
        $("[level=1]").siblings().remove();
        $(".accordion-container").css("right", '0px');
        $(".search,.exploreText,[level=1]").show();
        $("[level=1]").mCustomScrollbar("scrollTo", 'top', {scrollInertia: 1000});
    });
});

function onClickNextBox() {
    var urlNext = $(this).attr('url-next');
    var parent = $(this).closest(".box");
    var level = parseInt(parent.attr('level'));
    parent.nextAll('.box').remove();

    if (level == 1) {
        $(".accordion-container").css("right", 'auto');
        $(".search,.exploreText").hide();
    }
    if (level === 4) {
        window.open($(this).attr('url-next'), '_blank');
    } else {
        getNextBox(urlNext, level);
    }
}

function onClickMore() {
    var that = $(this);
    that.removeClass('glyphicon-chevron-down').addClass('refresh-animate');

    $.ajax({
        url: that.parent().attr('url-more'),
        dataType: 'json'
    }).done(function (res) {
        var items = getItemsFromResponse(res);
        var box = that.parent().siblings('div');

        $.each(items, function (i, item) {
            box.append($('<span class="name"><p class="animated-add-item fadeInUp" url-next="{1}">{0}</p></span>'.format(item.name, getHrefFromItem(item))));
        });

        if (res._links.next) {
            that.addClass('glyphicon-chevron-down').removeClass('refresh-animate');
            that.parent().attr('url-more', res._links.next.href);
        } else {
            that.remove();
        }

        onAppendItemInBox();
    }).fail(function (err) {
    });
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
            if(level === 4)item.urlnext = 'http://www.{0}.com/topics/{1}/{2}/{3}'.format(item.domain.id, encodeURIComponent(item.taxonomy.name), encodeURIComponent(item.name), item.id);
            box.append($('<span class="name"><p url-next="{1}">{0}</p></span>'.format(item.name, item.urlnext)));
        });

        container.append(box);

        if (json.urlmore) {
            container.append($('<div><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></div>').attr('url-more', json.urlmore));
        }

        validateWidthAndHideFirstColumn(function () {
            $('.accordion-container').append(container);
        });
    }).fail(function (err) {
    });
}

function parseJsonHalToBox(res) {
    var box = {};
    box.urlmore = res._links.next ? res._links.next.href : undefined;
    box.items = getItemsFromResponse(res);

    $.each(box.items, function (i) {
        box.items[i].urlnext = getHrefFromItem(box.items[i]);
    });

    return box;
}

function getItemsFromResponse(res) {
    for (var key in res._embedded)if (/domains|taxonomies|topics/.test(key))return res._embedded[key];
}

function getHrefFromItem(item) {
    for (var key in item._links)if (/taxonomies|discussions|topics|documents/.test(key))return item._links[key].href;
}

function validateWidthAndHideFirstColumn(done) {
    var containerBoxes = $('.accordion-container');
    var widthContainerBoxes = containerBoxes.offset().left + containerBoxes.width() + 300;

    if (widthContainerBoxes > window.innerWidth) {
        containerBoxes.find('.box:visible:first').animate({width: 'toggle'}, 300, function () {
            done();
        });
    } else {
        done();
    }
}

function onAppendItemInBox() {
    $('[level]').mCustomScrollbar("scrollTo", 'bottom', {scrollInertia: 1000});
}