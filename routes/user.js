const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


router.get('/', (req, res, next) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next)
})

router.patch('/:_id/edit', (req, res, next) => {
  const userId = req.params._id;
  const userInfo = req.body.userInfo;
   User.findById(userId)
   .then(user => {
     user.quote = userInfo.quote;
     console.log(user);
     user.save()
     .then(
      res.status(200).json(user)
     )
     .catch(next)
   })
   .catch(next)
})


module.exports = router;