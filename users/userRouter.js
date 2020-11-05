const express = require('express');

const router = express.Router();

const Users = require("./userDb.js")
const Posts = require("../posts/postDb.js")

router.use('/:id', validateUserId)


router.post('/', validateUser, (req, res) => {
  // do your magic!
  const body = req.body;
  Users.insert(body)
    .then(user => {
      res.status(201).json({
        message: "successfully created user",
        user: user
      })
    })
    .catch(err => {
      res.status(500).json({ message: "user not created"})
    })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const body = req.body;
  Posts.insert(body)
    .then(post => {
      res.status(200).json({
        message: "successfully created post",
        post: post
      })
    })
    .catch(err => {
      res.status(500).json({ message: "our bad! post not created"})
    })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      res.status(200).json({
        message: "here is a list of users",
        userList: user
      })
    })
    .catch(err => {
      res.status(500).json({ message: "our bad! cant 'get' :( "})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  Users.getById(id)
    .then(user => {
      res.status(200).json({
        message: "here is the user by id",
        userById: user
      })
    })
    .catch(err => {
      res.status(500).json({ message: "our bad! cant 'get' :( " })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const id = req.params.id
  Posts.getById(id)
    .then(post => {
      res.status(200).json({
        message: "here are the posts by id",
        postsById: post
      })
    })
    .catch(err => {
      res.status(500).json({ message: "our bad! cant 'get' :( " })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  Users.remove(id)
    .then(user => {
      req.status(200).json({
        message:"You deleted this user",
        userDeleted: user
      })
    })
    .catch(err => {
      res.status(500).json({ message: "our bad! cant 'delete' user :( " })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  const body = req.body
  user.update(id, body)
    .then(user => {
      res.status(200).json({
        message: "user update",
        userUpdated: user
      })
      .catch(err => {
        res.status(500).json({ message: "our bad! cant 'update' user :( " })
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if (user && user.id) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: `error retrieving user information`})
  })
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body
  if (body) {
    if (body.name) {
      const bodyMin = 1
      if (body.name.length = bodyMin) {
        next();
      } else {
        res.status(400).json({ message: `username must be at least ${bodyMin} letter` })
      }
    } else {
      res.status(400).json({ message: "missing required name field" })
    }
  } else {
    res.status(400).json({ message: "missing user data" })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  if (body) {
    if (body.text) {
      const postMin = 1;
      if (body.text.length >= postMin) {
        body.user_id = req.params.id;
        next();
    } else {
      res.status(400).json({ message: `Your post must be at least ${postMin} letters.` }) 
    }
  } else {
    res.status(400).json({ message: "missing required text field" })
    }
  } else {
    res.status(400).json({ message: "missing post data" })
  }
}

module.exports = router;
