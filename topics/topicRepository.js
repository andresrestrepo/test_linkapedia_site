var request = require('request');
var util = require('util');

const RETRIEVE_CHILDREN_URL = "http://api.linkapedia.com/topics/%d/children?limit=10";
const RETRIEVE_TOPIC_URL = "http://api.linkapedia.com/topics/%d";

module.exports = {
    getSons: function(topicId, callback){
    request(util.format(RETRIEVE_CHILDREN_URL, topicId),
        function(error, response, body) {
            callback(error, response, body);
        });
    },
    getTopic: function(topicId, callback){
        request(util.format(RETRIEVE_TOPIC_URL, topicId),
            function(error, response, body) {
                callback(error, response, body);
            });
    }
};

