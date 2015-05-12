var async = require('async');
var blogsRepository = require("./blogsRepository");

module.exports = {
    getBlog: function (blogId, done, fail) {
        var blog = {
            errors: {}
        };

        var tasks = [
            function (done) {
                blogsRepository.getBlogById(blogId, function (blog) {
                    blog.info = blog;
                    done();
                }, function (error) {
                    fail(error);
                });
            },
            function (done) {
                blogsRepository.getDomainsByBlogId(blogId, function (domains) {
                    blog.domains = domains;
                    done();
                }, function (error) {
                    blog.errors.gettingblogdomains = 'Failed to getting blog domains :(';
                    done();
                });
            }
        ];

        async.parallel(tasks, function () {
            done(blog);
        });
    }
};