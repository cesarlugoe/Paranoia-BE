const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const gameSchema = new Schema({
  roomName: String,
  admin: { 
    type: ObjectId,
    ref: 'User',
  },
  participants: [{
    type: ObjectId,
    ref: 'User',
  }],
  missions: [], 
  endingDate: Date,
  numberOfSurvivors: Number,
  killLog:[],
  startedStatus: Boolean,
  gameFinished: Boolean,
}, 
  {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },

});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;