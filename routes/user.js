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


module.exports = router;