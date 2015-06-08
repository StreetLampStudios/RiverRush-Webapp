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

function AnimalAddedEvent(variation) {
  animalVariation = variation;
}

