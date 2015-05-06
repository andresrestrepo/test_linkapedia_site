var express = require('express');
var router = express.Router();
var blogService = require("../blogs/blogsService");

router.get('/:blogId/domains', function(req, res, next) {
    var blogId = req.params.blogId;
    blogService.getBlogLandingPage(blogId, function(err, data){
        if (err) return next(err);
        res.render('blogs', {'domains': data});
    });
});

module.exports = router;
