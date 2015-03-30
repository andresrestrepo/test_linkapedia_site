var express = require('express');
var router = express.Router();
var topicService = require("../topics/topicService");

router.get('/:topicId', function(req, res, next) {
    var topicId = req.params.topicId;
    topicService.getTopicPage(topicId, function(err, topicData){
        if (err) return next(err);
        res.render('topics', {'topic': topicData});
    });
});

module.exports = router;
