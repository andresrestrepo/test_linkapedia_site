var request = require("request");

module.exports = {
    get_sons_by_topic_id: function(id, callback){
    request("http://api.linkapedia.com/topics/95424733/children?limit=20",
        function(error, response, body) {
            callback(body);
        });
    }
};

