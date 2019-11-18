const express = require('express');

const router = new express.Router();

const Post = require('./../models/post');

router.get('/list', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('post/list', { posts });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('post/create');
});

router.post('/create', (req, res, next) => {
  const text = req.body.text;
  Post.create({
    text: text
  })
    .then(document => {
      res.redirect(`/post/${document._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:postId', (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      res.render('post/single', { post });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:postId/edit', (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      res.render('post/edit', { post });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:postId/edit', (req, res, next) => {
  const postId = req.params.postId;
  Post.findByIdAndUpdate(postId, {
    text: req.body.text
  })
    .then(data => {
      res.redirect(`/post/${postId}`);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:postId/delete', (req, res, next) => {
  const postId = req.params.postId;
  Post.findByIdAndDelete(postId)
    .then(data => {
      res.redirect(`/post/list`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
