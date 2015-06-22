describe("Testing Event Handling", function() {
	it("should handle GameStartedEvent correctly", function () {
		GameStartedEvent();
		expect(gamestate).toBe("game");
	});
	
	it("should handle GameStoppedEvent correctly", function () {
		GameStoppedEvent();
		expect(gamestate).toBe("stopped");
	});
	
	it("should handle GameWaitingEvent correctly", function () {
		GameWaitingEvent();
		expect(gamestate).toBe("waiting");
	});
	
	it("should handle GameFinishedEvent correctly", function () {
		GameFinishedEvent(0);
		expect(gamestate).toBe("finished");
		expect(teamThatWon).toBe(0);
		GameFinishedEvent(1);
		expect(gamestate).toBe("finished");
		expect(teamThatWon).toBe(1);
	});
	
	it("should handle AnimalJumpedEvent correctly", function () {
		AnimalJumpedEvent();
		expect(gamestate).not.toBe("jumped");
	});
	
	it("should handle AnimalFellOffEvent correctly", function () {
		expect(doFall).toBe(false);
		AnimalFellOffEvent();
		expect(doFall).toBe(true);
	});
	
	it("should handle AnimalReturnedToBoatEvent correctly", function () {
		expect(doGetUp).toBe(false);
		AnimalReturnedToBoatEvent();
		expect(doGetUp).toBe(true);
	});
	
	it("should handle AnimalDroppedEvent correctly", function () {
		expect(gotDroppedEvent).toBe(false);
		AnimalDroppedEvent();
		expect(gotDroppedEvent).toBe(true);
	});
	
	it("should handle AnimalAddedEvent correctly", function () {
		var variation = 3;
		var team = 0;
		var sector = 'FRONT';
		AnimalAddedEvent(variation, team, sector);
		expect(teamID).toBe(team);
		expect(animalVariation).toBe(variation);
	});
	
	it("should handle TeamProgressEvent correctly", function () {
		TeamProgressEvent(80);
		expect(gamestate).not.toBe("teamProgress");
	});
});