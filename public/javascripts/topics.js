$(document).ready(function(){
    $(".topics-porlet [class=col-md-1]").mouseenter(function() {
        $(this).animate({top:"-=10px"}, 200);
    }).mouseleave(function() {
        $(this).finish().animate({top:"+=10px"}, 200);
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

