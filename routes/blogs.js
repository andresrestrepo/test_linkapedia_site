var express = require('express');
var router = express.Router();
var blogService = require("../blogs/blogsService");

router.get('/:blogId/domains', function (req, res, next) {
    var blogId = req.params.blogId;

    blogService.getBlog(blogId, function (blog) {
        res.render('blog', {blog: blog});
    }, function (error) {
        next(error);
    });
});

module.exports = router;