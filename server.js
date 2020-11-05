const express = require('express');

const server = express();

server.use(express.json())

const userRouter = require("./users/userRouter.js")
const postRouter = require("./posts/postRouter.js")


server.use(logger)

server.use("/api/user", userRouter)
server.use("/api/posts", postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Method: ${req.method}, Timestamp: [${new Date().toISOString()}], Request URL: "${req.url}"`)
  next();
}

module.exports = server;
