function GameStartedEvent() {
    gamestate = 'game';
}

function GameStoppedEvent() {
    gamestate = 'stopped';
}

function GameWaitingEvent() {
    gamestate = 'waiting';
}

function GameFinishedEvent(winningTeam) {
    gamestate = 'finished';
    if (winningTeam == 0 || winningTeam == 1) {
        teamThatWon = winningTeam;
    }
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

function AnimalAddedEvent(variation, team, sector, numberInLine) {
    teamID = team;
    teamName = teamNames[team];

    animalVariation = variation;
    setAnimalVariation(variation);
    if (sector) {
        setAnimalSector(sector);
    }
    if (numberInLine) {
        setAnimalNumberInLine(numberInLine);
    }
}

function TeamProgressEvent(progress) {
    updateBoatProgress(progress);
}
