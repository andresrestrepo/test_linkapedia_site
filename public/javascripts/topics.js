$(document).ready(function () {
    registerEventPorletAnimation( $(".topics-porlet [class=col-md-1]"));
    function registerEventPorletAnimation(selector){
        selector.mouseenter(function () {
            $(this).animate({top: "-=10px"}, 200);
        }).mouseleave(function () {
            $(this).finish().animate({top: "+=10px"}, 200);
        });
    }

    $("#next-topics-button").click(function (evt) {
        evt.preventDefault();
        var nextUrl = $("#next-topics").text();
        if (nextUrl == "") {
            popup("popup-not-more-topics");
            return;
        }
        topicsService.getNextTopics(nextUrl, function (data) {
            for (var index in data.items) {
                var divCol = $("<div>").addClass("col-md-1");
                divCol.attr("onclick", "window.location.href='/topics/" + data.items[index].id +"'");
                var divContainerTopicImage = $("<div>").addClass("container-topic-image");
                var divImageCropped = $("<div>").addClass("topic_image image-cropper");
                var img = $("<img>").attr("url-data", "https://s3.amazonaws.com/testnodeimages/" + data.items[index].id);
                img.css("display", "none");
                var divTopicTitle = $("<div>").addClass("porlet-topic-title").append($("<p>").text(data.items[index].name.toUpperCase()));
                divImageCropped.append(img);
                divContainerTopicImage.append(divImageCropped);
                divContainerTopicImage.append(divTopicTitle);
                divCol.append(divContainerTopicImage);
                $(".topics-porlet").find(".row").append(divCol);
                convertToLinkapediaImage(img);
                registerEventPorletAnimation(divCol);
            }
            if (data.next) {
                $("#next-topics").text(data.next);
            } else {
                $("#next-topics").text("");
            }
        }, function (err) {

        });
    });

    $(".topic_image").children($("<img>")).each(function (index) {
        convertToLinkapediaImage($(this));
    });

    function convertToLinkapediaImage(tagImg) {
        tagImg.attr("src", tagImg.attr("url-data")).load(function () {
            var naturalWidth = tagImg.get(0).naturalWidth;
            var naturalHeight = tagImg.get(0).naturalHeight;
            if (naturalWidth > 300 || naturalHeight > 200) {
                var percentScale = getPercentScale(naturalWidth, naturalHeight, 300, 200);
                var widthScale = naturalWidth * percentScale;
                var heightScale = naturalHeight * percentScale;
                if (isAllowCropImage(widthScale, heightScale, 300, 200)) {
                    var width = (widthScale - 300) / 2;
                    var height = (heightScale - 200) / 2;
                    tagImg.css("position", "absolute");
                    tagImg.css("left", width * (-1));
                    tagImg.css("top", height * (-1));
                }
                tagImg.css("width", widthScale + "px");
                tagImg.css("height", heightScale + "px");
            }
            tagImg.show("fast");
        }).error(function () {
            alert("error loading image");
        });
    }

    function getPercentScale(width, height, widthScale, heightScale) {
        var maxWidth = Math.max(width, widthScale);
        var maxHegiht = Math.max(height, heightScale);
        var percentScale = Math.min(height, heightScale) / maxHegiht;
        return Math.max(percentScale, Math.min(width, widthScale) / maxWidth);
    }

    function isAllowCropImage(imageWidth, imageHeight, width, height) {
        return imageWidth >= width && imageHeight >= height;
    }
});

