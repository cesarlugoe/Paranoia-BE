function shuffleParticipants(participants) {
  for (let i = participants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [participants[i], participants[j]] = [participants[j], participants[i]];
  }
  return participants;
}

function rearrengeArray(array) {
  const changedPosition = array[0];
  array.push(changedPosition);
  return array.slice(1)
}


function sortGame(mission, participants) {

  let sortedParticipants = shuffleParticipants(participants);

  sortedParticipants.forEach((participant, index)  => {
    mission[index].target = participant;
  });

  sortedParticipants = rearrengeArray(sortedParticipants);

  sortedParticipants.forEach((participant, index)  => {
    mission[index].killer = participant;
  });
  return mission; 
}

module.exports = { 
  sortGame,
};