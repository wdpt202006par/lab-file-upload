const express = require('express');
const router = express.Router();

const Post = require('../models/Post.model.js');

/* GET home page */
router.get('/', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('index', {
        posts: posts
      });
    })  
});

module.exports = router;
