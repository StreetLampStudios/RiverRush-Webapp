describe("Testing Resource Handling", function() {
	it("should have 0 loaded images and sounds at the beginning", function () {
		expect(imagesToBeLoaded).toBe(0);
		expect(imagesLoaded).toBe(0);
		expect(soundsToBeLoaded).toBe(0);
		expect(soundsLoaded).toBe(0);
	});
	
	it("should update the amount of images to be loaded", function () {
		loadResources();
		expect(imagesToBeLoaded).toBeGreaterThan(9); // At least 10 image files are required in the game
		expect(imagesLoaded).toBe(0);
		expect(soundsToBeLoaded).toBeGreaterThan(2); // At least 3 sounds are required in the game
		expect(soundsLoaded).toBe(0);
	});
	
	it("should update the progress of the amount of images and sounds to be loaded", function () {
		var imagesToLoad = imagesToBeLoaded;
		var soundsToLoad = soundsToBeLoaded;
		
		newImageLoaded();
		expect(imagesToBeLoaded).toBe(imagesToLoad - 1);
		
		newSoundLoaded();
		expect(soundsToBeLoaded).toBe(soundsToBeLoaded - 1);
	});
});