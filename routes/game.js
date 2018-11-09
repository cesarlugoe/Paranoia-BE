const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const User = require('../models/user');
const Game = require('../models/game');
const Mission = require('../models/mission');
const helpers= require('../helpers/helpers');



/* ------------ Game Detail --------------*/

router.get('/:_id', (req, res, next) => {
  const gameId = req.params._id;

Game.findById(gameId)
  .populate('admin')
  .populate('participants')
  .then((game) => {
    res.status(200).json(game);
  })
  .catch(next);
})


/* ------------ Create new Game --------------*/

router.post('/', (req, res, next) => {
  const { roomName } = req.body;
  const adminId = req.session.currentUser._id;
  

  if(!roomName) {
    return res.status(422).json(
      {
      error: 'empy field'
    })
  }

  const newGame = new Game({ 
    roomName,
    admin: ObjectId(adminId),
    participants: [ObjectId(adminId)],
  });
  newGame.save()
  .then(() => {
    res.status(200).json(newGame);
  })
  .catch(next);  
});

/* ------------ Start Game --------------*/

router.get('/:_id/start', (req, res, next) => {
  const gameId = req.params._id;
  Game.findById(gameId)
  .populate('admin')
  .populate('participants')
  .then(game => {
    const { missions, participants } = game;
    const sortedMissions = helpers.sortGame(missions, participants);
    game.missions = sortedMissions;
    game.save()
    .then(() => {
      res.status(200).json(game);
    })
    .catch(next); 
  })
  .catch(next);
});

module.exports = router;