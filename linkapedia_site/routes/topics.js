var express = require('express');
var router = express.Router();
var topics_repository = require("./../controllers/topics/topics_repository")

router.get('/', function(req, res, next) {
    topics_repository.get_sons_by_topic_id(1, function(data){
        res.render('topics', {'topics': JSON.parse(data)});
    });
});

module.exports = router;
