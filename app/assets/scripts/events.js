function GameStartedEvent() {

}

function GameStoppedEvent() {

}

function GameWaitingEvent() {

}

function GameFinishedEvent() {

}

function AnimalJumpedEvent() {

}

function AnimalFellOffEvent() {
  doFall = true;
}

function AnimalReturnedToBoatEvent() {
  doGetUp = true;
}

function AnimalDroppedEvent() {
  gotDroppedEvent = true;
}

function AnimalAddedEvent(variation, team, square, numberInLine) {
  animalVariation = variation;
  setAnimalVariation(variation);
  teamID = team;
  teamName = teamNames[team];
  
  if(square)
  {
	setAnimalSquare(square);
  }
  if(numberInLine)
  {
	setAnimalNumberInLine(numberInLine);
  }
}

function TeamProgressEvent(progress) {
	updateBoatProgress(progress);
}
