const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Game = require('../models/game');
const ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .then(user => { 
      Game.find({
        participants: ObjectId(userId)
      })
      .then(games => {
        const data = {games, user}
      res.status(200).json(data)
      })
      .catch(next)
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