const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');

const User = require('../models/user');
const Game = require('../models/game');
const helpers = require('../helpers/helpers');
const nodemailer = require('nodemailer');
const middlewares = require('../helpers/middlewares');


const creds = {
  USER: 'ester.ironhack@gmail.com', 
  PASS: 'ironhack2018!',
}

let transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  }
}

let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});


/* ------------- Game Join ----------------*/
router.post('/join', (req, res, next) => {
  const { mission, roomName }  = req.body;
  const userId = req.session.currentUser._id;
  if(!mission || !roomName) {
    return res.status(422).json(
      {
      error: 'empty field'
    })
  }

  Game.findOne({roomName: roomName})
    .then(game => {
      const isInArray = game.participants.some(participant => {
        return participant.equals(userId);
        })
        if(!isInArray) {
          game.participants.push(ObjectId(userId))
          game.missions.push({ mission, target:'', killer:'' })
          game.save()
          .then(() => {
            res.status(200).json(game);
      })
      .catch(next);
      }
    })
    .catch(next)
})

/* ------------ Game Detail --------------*/
router.get('/:_id', middlewares.objectIdValid, (req, res, next) => {
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
  const { roomName, mission, message, email } = req.body;
  const adminId = req.session.currentUser._id;
  
  let emailContent = `name: ${adminId} \n email: ${email} \n message: ${message}`;
  let mail = {
    from: adminId,
    to: email,
    subject: 'Paranoia Game Invite',
    text: message,
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  });  
  

  if(!roomName || !mission) {
    return res.status(422).json(
      {
      error: 'empty field'
    })
  }


  const newGame = new Game({ 
    roomName,
    missions: {mission: mission},
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
router.get('/:_id/start', middlewares.objectIdValid,  (req, res, next) => {
  const gameId = req.params._id;
  Game.findById(gameId)
  .populate('admin')
  .populate('participants')
  .lean()
  .then(game => {
    const { missions, participants } = game;
    const sortedMissions = helpers.sortGame(missions, participants);
    game.missions = sortedMissions;
    game.numberOfSurvivors = participants.length;
    game.startedStatus = true;
    Game.updateOne({_id: gameId}, game)
      .then((game) => {
        game._id = gameId
        res.status(200).json(game);
      })
    .catch(next); 
  })
  .catch(next);
});

/* ------------- Kill user ----------------*/ 
router.post('/:_id/kill', middlewares.objectIdValid,  (req, res, next) => {
  const gameId = req.params._id;
  const userId = req.session.currentUser._id;
  Game.findById(gameId)
  .populate('admin')
  .populate('participants')
  .then(game => {
    const { missions } = game;
    const userMissionIndex = missions.findIndex(mission => {
      return mission.killer.toString() === userId;
    });
    const targetId = missions[userMissionIndex].target;
    const newMissionIndex = missions.findIndex(mission => {
      return mission.killer.toString() === targetId.toString();
        });

    const killEvent = {
      killer: missions[userMissionIndex].killer,
      target: missions[userMissionIndex].target,
      mission: missions[userMissionIndex].mission,
      date: moment().format('DD MMM HH:mm a'),
    }     
    game.killLog.push(killEvent);
     missions[newMissionIndex].killer = userId;
     missions.splice(userMissionIndex, 1);
     game.numberOfSurvivors =  game.numberOfSurvivors -1;
     if ( game.numberOfSurvivors === 1) {
       game.gameFinished = true;
     }
      game.save()
      .then(() => {
        res.status(200).json(game);
      })
      .catch(next); 
     })
  })

  /* ------------ ReSort Game --------------*/
router.get('/:_id/sort', middlewares.objectIdValid,  (req, res, next) => {
  const gameId = req.params._id;
  
  Game.findById(gameId)
  .populate('admin')
  .populate('participants')
  .then(game => {
    const {missions} = game;
    const survivors = game.missions.map(mission => {
      return mission.killer;
    })
    const sortedMissions = helpers.sortGame(missions, survivors);
    game.missions = sortedMissions;
    game.save()
    .then(() => {
      res.status(200).json(game);
    })
    .catch(next); 
  })
  .catch(next); 
})

module.exports = router;