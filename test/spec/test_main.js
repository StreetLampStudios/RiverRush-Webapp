describe("Main Testing", function() {
	it("should turn on the overlay correctly", function () {
		expect(overlayvisible).toBe(false);
		turnOnOverlay();
		expect(overlayvisible).toBe(true);
		turnOnOverlay();
		expect(overlayvisible).toBe(true);
	});
	
	it("should turn off the overlay correctly", function () {
		expect(overlayvisible).toBe(true);
		turnOffOverlay();
		expect(overlayvisible).toBe(false);
		turnOffOverlay();
		expect(overlayvisible).toBe(false);
	});
	
});