describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe("Testing testing", function() {
	it("can do calls to my code, right?", function () {
		calculateWaveSpot(0);
		expect(wave_x).toBe(0);
		expect(wave_y).toBe(0);
	});
	
	it("will work for this too, won't it?", function () {
		calculateWaveSpot(100);
		expect(wave_x).not.toBe(0);
		expect(wave_y).not.toBe(0);
	});
});