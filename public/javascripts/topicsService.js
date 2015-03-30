var topicsService = (function () {
    return {
        getNextTopics: function (nextUrl, onSuccess, onError) {
            $.get(nextUrl).done(onSuccess).fail(onError);
        }
    };
})();
