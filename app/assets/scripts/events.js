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

function AnimalAddedEvent(variation, square, numberInLine) {
  animalVariation = variation;
  setAnimalVariation(variation);
  
  if(square)
  {
	setAnimalSquare(square);
  }
  if(numberInLine)
  {
	setAnimalNumberInLine(numberInLine);
  }
}

