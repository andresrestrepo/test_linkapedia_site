var blogsRepository = require("./blogsRepository");

module.exports = {
    getBlogLandingPage: function (blogId, callback) {
        blogsRepository.getDomainsByBlog(blogId, function(err, response, body){
            callback(err, body);
        });
    }
};
