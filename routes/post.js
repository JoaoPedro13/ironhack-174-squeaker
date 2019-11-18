const express = require('express');

const router = new express.Router();

const Post = require('./../models/post');

const routeGuard = require('./../middleware/route-guard');

router.get('/list', (req, res, next) => {
  Post.find()
    .populate('author')
    .then(posts => {
      res.render('post/list', { posts });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

router.post('/create', routeGuard, (req, res, next) => {
  const text = req.body.text;
  const author = req.session.user;
  // const author = req.user._id;
  Post.create({
    text,
    author
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
    .populate('author')
    .then(post => {
      console.log(post);
      res.render('post/single', { post });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:postId/edit', routeGuard, (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (post.author === req.session.user) {
        res.render('post/edit', { post });
      } else {
        next(new Error('User has no permission to edit post.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:postId/edit', routeGuard, (req, res, next) => {
  const postId = req.params.postId;

  Post.findOneAndUpdate(
    {
      _id: postId,
      author: req.session.user
    },
    {
      text: req.body.text
    }
  )
    .then(data => {
      res.redirect(`/post/${postId}`);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:postId/delete', routeGuard, (req, res, next) => {
  const postId = req.params.postId;
  Post.findOneAndDelete({
    _id: postId,
    author: req.session.user
  })
    .then(data => {
      res.redirect(`/post/list`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
