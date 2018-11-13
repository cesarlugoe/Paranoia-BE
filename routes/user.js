const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Game = require('../models/game');
const ObjectId = mongoose.Types.ObjectId;
const uploadCloud = require('../helpers/cloudinary.js')

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

  //  parser.single('image')
router.patch('/:_id/edit', (req, res, next) => {
  const userId = req.params._id;
  const quote = req.body.userInfo.quote;
  
    User.findByIdAndUpdate(userId, {quote: `${quote}`})
   .then(user => {
      res.status(200).json(user)
   })
   .catch(next)
})

router.patch('/:_id/picture', uploadCloud.single('picture'), (req, res, next) => {
  const userId = req.params._id;
  let image = req.file
  User.findByIdAndUpdate(userId, { $set: { image: image.url }}, {new: true})
  .then((user) => {
    res.status(200).json(user)
  })
  
})


module.exports = router;