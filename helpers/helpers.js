function shuffleParticipants(participants) {
  for (let i = participants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [participants[i], participants[j]] = [participants[j], participants[i]];
  }
  return participants;
}

function reverseArray(array) {
  return array.reverse(/./g, function(c) {
    return array.pairs[c]
  });
}


function sortGame(mission, participants) {

  let sortedParticipants = shuffleParticipants(participants);

  sortedParticipants.forEach((participant, index)  => {
    mission[index].target = participant;
  });

  sortedParticipants = reverseArray(sortedParticipants);

  sortedParticipants.forEach((participant, index)  => {
    mission[index].killer = participant;
  });
  return mission; 
}

module.exports = { 
  sortGame,
};