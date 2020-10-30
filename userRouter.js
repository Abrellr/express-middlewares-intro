const express = require('express')
const userRouter = express.Router()

userRouter.get("/", (req, res, next) => {
    // const error = new Error('Aaaaaaah')
    let errors;
    if (errors) {
      next(error)
    } else {
      res.send("Users page");
    }
  });

module.exports = userRouter