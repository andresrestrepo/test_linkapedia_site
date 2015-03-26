var async = require('async');
var topicsRepository = require("./topicRepository");

module.exports = {
    getTopicPage: function(topicId, callback){
        var topicPageInfo = {};
        async.parallel([
            function(callback) {
                topicsRepository.getSons(topicId, function(err, data){
                    if (err) return callback(err);
                    //to testing
                    var topics = JSON.parse(data);
                    for (index in topics.items){
                        var topic_id = topics.items[index].id;
                        var image_url = "https://s3.amazonaws.com/testnodeimages/"+topic_id;
                        topics.items[index].image =image_url
                    }
                    topicPageInfo.topicChildren = topics;
                    callback();
                });
            },
            function(callback) {
                topicsRepository.getTopic(topicId, function(err, data){
                    if (err) return callback(err);
                    topicPageInfo.topicInfo =  JSON.parse(data);
                    callback();
                });
            }
        ], function(err) {
            callback(err, topicPageInfo);
        });
    }
};
