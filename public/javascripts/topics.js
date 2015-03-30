$(document).ready(function(){
    $(".topics-porlet [class=col-md-1]").mouseenter(function() {
        $(this).animate({top:"-=10px"}, 200);
    }).mouseleave(function() {
        $(this).finish().animate({top:"+=10px"}, 200);
    });

    $("#next-topics-button").click(function(evt){
        var nextUrl = $("#next-topics").text();
        if (nextUrl == ""){
            alert("end");
            return;
        }
        topicsService.getNextTopics(nextUrl, function(data){
            for (var index in data.items){
                var divCol = $("<div>").addClass("col-md-1");
                var divContainerTopicImage = $("<div>").addClass("container-topic-image");
                var divImageCropped = $("<div>").addClass("topic_image image-cropper");
                var img = $("<img>").attr("src", "https://s3.amazonaws.com/testnodeimages/"+data.items[index].id);
                img.css("max-height", "200px");
                img.css("max-width", "300px");
                var divTopicTitle = $("<div>").addClass("porlet-topic-title").append($("<p>").text(data.items[index].name.toUpperCase()));
                divImageCropped.append(img);
                divContainerTopicImage.append(divImageCropped);
                divContainerTopicImage.append(divTopicTitle);
                divCol.append(divContainerTopicImage);
                $(".topics-porlet").find(".row").append(divCol);
            }
            if (data.next){
                $("#next-topics").text(data.next);
            }else{
                $("#next-topics").text("");
            }
        }, function(err){

        });
    });

    $( ".topic_image").children($("<img>")).each(function( index ) {
        $(this).attr("src", $(this).attr("url-data")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {

            } else {
                if (this.naturalWidth >300 || this.naturalHeight>200){
                    var percentScale = getPercentScale(this.naturalWidth, this.naturalHeight, 300, 200);
                    var widthScale = this.naturalWidth * percentScale;
                    var heightScale = this.naturalHeight * percentScale;
                    if (isAllowCropImage(widthScale, heightScale, 300, 200)){
                        var width = (widthScale - 300) / 2;
                        var height = (heightScale - 200) / 2;
                        $(this).css("position", "absolute");
                        $(this).css("left", width * (-1));
                        $(this).css("top", height * (-1));
                    }
                    $(this).css("width", widthScale+"px");
                    $(this).css("height", heightScale+"px");
                }
                $(this).show();
            }
        });
    });


    function convertToLinkapediaImage(){
        $(this).attr("src", $(this).attr("url-data")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {

            } else {
                if (this.naturalWidth >300 || this.naturalHeight>200){
                    var percentScale = getPercentScale(this.naturalWidth, this.naturalHeight, 300, 200);
                    var widthScale = this.naturalWidth * percentScale;
                    var heightScale = this.naturalHeight * percentScale;
                    if (isAllowCropImage(widthScale, heightScale, 300, 200)){
                        var width = (widthScale - 300) / 2;
                        var height = (heightScale - 200) / 2;
                        $(this).css("position", "absolute");
                        $(this).css("left", width * (-1));
                        $(this).css("top", height * (-1));
                    }
                    $(this).css("width", widthScale+"px");
                    $(this).css("height", heightScale+"px");
                }
                $(this).show();
            }
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

