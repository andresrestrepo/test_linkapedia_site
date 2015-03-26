var request = require("request");

module.exports = {
    getSons: function(topicId, callback){
    request("http://api.linkapedia.com/topics/"+topicId+"/children?limit=50",
        function(error, response, body) {
            callback(error, body);
        });
    },
    getTopic: function(topicId, callback){
        request("http://api.linkapedia.com/topics/"+topicId,
            function(error, response, body) {
                callback(error, body);
            });
    }
};

