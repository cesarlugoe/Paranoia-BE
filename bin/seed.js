



const gameData = [
  {
  roomName: 'prueba',
  admin: '5be458945e1016f05c07cf0f',
  participants: ['5be45cdc5e1016f05c07cf10','5be458945e1016f05c07cf0f','5be43df8a1814ee93aa7ed05','5be42426a1814ee93aa7ed04'],
  missions: [{
    killer:'',
    target:'',
    a:'',
  },{
    killer:'',
    target:'',
    b:'',
  },{
    killer:'',
    target:'',
    c:'',
  },{
    killer:'',
    target:'',
    d:'',
  }], 
}, 
  
]

const mongoose = require('mongoose');
const Game = require('../models/game');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/paranoia', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

Game.insertMany(gameData)
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('error', error);
  });
