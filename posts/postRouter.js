const express = require('express');
const { post } = require('../server.js');

const router = express.Router();

const Posts = require('./postDb.js');

router.use('/:id', validatePostId)

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(post => {
      res.status(200).json({
        message: "here are all posts",
        postList: post
      })
    })
    .catch(err => {
      res.status(500).json({ message: "our bad! cant 'get' posts."})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  Posts.getById(id)
    .then(post => {
      res.status(200).json({
        message: `here is the id: ${id}.`,
        postById: post
      })
    })
    .catch(err => {
      res.status(500).json({ message: "our bad! can't get post by id."})
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  Posts.remove(id)
    .then(post => {
      req.status(200).json ({
        message: "You deleted this post",
        postDeleted: post
      })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;
  Posts.update(id, body)
  .then(post => {
    req.status(200).json ({
      message: "You updated this post",
      postUpdated: post
    })
  })
  .catch(err => {
    res.status(500).json({ message: "Our bad! Can't update!"})
  })

});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  Posts.getById(id)
    .then(post => {
      if (post) {
        next();
      } else {
        res.status(400).json({ message: `post belonging to ${id} does not exist`})
      }
    })
    .catch(err => {
      res.status(500).json({ message: "our bad! can't retrieve that post!"})
    })
}

module.exports = router;
