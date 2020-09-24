const express = require('express');
const router = express.Router();

const Post = require('../models/Post.model.js');

const uploadCloud = require('../configs/cloudinary.config.js')

router.get('/new', function (req, res, next) {
  if (!req.session.currentUser) {
    res.redirect('/login');
    return;
  }

  res.render('posts/new');
});

router.post('/', uploadCloud.single('pic'), function (req, res, next) {
  if (!req.session.currentUser) {
    return next(new Error('You must be logged to create a post'));
  }

  Post.create({
    content: req.body.content,
    creatorId: req.session.currentUser.id,
    picPath: req.file.path,
    picName: req.file.originalname
  })
    .then(post => res.redirect('/'))
    .catch(next)
  ;
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id;

  Post.findById(id)
    .then(post => {
      res.render('posts/show', {
        post: post,
        user: req.session.currentUser
      });
    })
    .catch(next);
  ;
});

module.exports = router; 