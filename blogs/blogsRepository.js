var request = require('request');
var util = require('util');

const RETRIEVE_DOMAINS_BY_BLOG = "http://localhost:8080/blogs/%s/domains";

module.exports = {
    getDomainsByBlog: function(blogId, callback){
    request(util.format(RETRIEVE_DOMAINS_BY_BLOG, blogId),
        function(error, response, body) {
            callback(error, response, JSON.parse(body));
        });
    }
};

