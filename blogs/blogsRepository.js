var request = require('request');
var util = require('util');
var config = require('../config');

const RETRIEVE_BLOG_BY_ID = util.format("%s/blogs/%s", config.urlApi);
const RETRIEVE_DOMAINS_BY_BLOG_ID = util.format("%s/blogs/%s/domains", config.urlApi);

module.exports = {
    getBlogById: function (blogId, done, fail) {
        var url = util.format(RETRIEVE_BLOG_BY_ID, blogId);

        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200)return done(JSON.parse(body));
            return fail(error);
        });
    },
    getDomainsByBlogId: function (blogId, done, fail) {
        var url = util.format(RETRIEVE_DOMAINS_BY_BLOG_ID, blogId);

        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200)return done(JSON.parse(body));
            return fail(error);
        });
    }
};

