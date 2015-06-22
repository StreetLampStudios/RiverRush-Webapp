describe("A suite", function () {
    // Just for making sure Jasmine is working
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });

    it("Another spec", function () {
        expect(true).not.toBe(false);
    });
});