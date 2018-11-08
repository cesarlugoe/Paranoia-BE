const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const missionSchema = new Schema({
  killer: { 
    type: ObjectId,
    ref: 'User',
  },
  target: { 
    type: ObjectId,
    ref: 'User',
  },
  mission: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;