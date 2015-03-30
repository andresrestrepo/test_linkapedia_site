var async = require('async');
var topicsRepository = require("./topicRepository");

module.exports = {
    getTopicPage: function(topicId, callback){
        var topicPageInfo = {};
        async.parallel([
            function(callback) {
                topicsRepository.getSons(topicId, function(error, response, data){
                    if (!error && response.statusCode == 200) {
                        var topics = JSON.parse(data);
                        for (var currentTopic in topics.items){
                            var topic_id = topics.items[currentTopic].id;
                            topics.items[currentTopic].image = "https://s3.amazonaws.com/testnodeimages/"+topic_id;
                        }
                        topicPageInfo.topicChildren = topics;
                        return callback();
                    }
                    var err = new Error('Exception getting children');
                    err.status = response.statusCode;
                    callback(err);
                });
            },
            function(callback) {
                topicsRepository.getTopic(topicId, function(error, response, data){
                    if (!error && response.statusCode == 200) {
                        topicPageInfo.topicInfo = JSON.parse(data);
                        return callback();
                    }
                    var err = new Error('Exception getting topic');
                    err.status = response.statusCode;
                    callback(err);
                });
            }
        ], function(err) {
            callback(err, topicPageInfo);
        });
    }
};
