const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

function shuffleParticipants(participants) {
  for (let i = participants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [participants[i], participants[j]] = [participants[j], participants[i]];
  }
  
  return participants;
}

function rearrengeArray(array) {
  const changedPosition = array[0];
  const newArray = array.slice(1)
  newArray.push(changedPosition);
  
  return newArray
}


function sortGame(mission, participants) {
  let sortedParticipants = shuffleParticipants(participants);
  sortedParticipants.forEach((participant, index)  => {
    mission[index].target = ObjectId(participant._id);
  });
  
  sortedParticipants = rearrengeArray(sortedParticipants);

  sortedParticipants.forEach((participant, index)  => {
    mission[index].killer = ObjectId(participant._id)
  });
  return mission; 
}

module.exports = { 
  sortGame,
};