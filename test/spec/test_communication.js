describe("Testing Event Handling", function () {
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
        expect(gotDroppedEvent).toBe(true);
        gotDroppedEvent = false;
        AnimalDroppedEvent();
        expect(gotDroppedEvent).toBe(true);
    });

    // AnimalAddedEvent can not be tested because it relies on DOM Elements

    // TeamProgressEvent can not be tested because it relies on DOM Elements
});