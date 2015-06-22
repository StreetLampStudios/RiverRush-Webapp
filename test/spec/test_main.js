describe("Main Testing", function () {

    /* Please note that the main is barely testable, because almost all functions in
     the main rely on HTML DOM elements. Here I tested the functions in main that don't
     rely on HTML DOM elements. All other functions have extensively been tested manually */

    it("getUp() test", function () {
        getUp(0);
        expect(animalGetUp).toBe(0);
        getUp(300);
        expect(animalGetUp).toBe(300);
        getUp(193478920);
        expect(animalGetUp).toBe(193478920);
    });

    it("calculateWaveSpot test 1", function () {
        calculateWaveSpot(0);
        expect(wave_x).toBe(0);
        expect(wave_y).toBe(0);
    });

    it("calculateWaveSpot test 2", function () {
        calculateWaveSpot(100);
        expect(wave_x).not.toBe(0);
        expect(wave_y).not.toBe(0);
    });

    it("calculateWaveSpot test 3", function () {
        calculateWaveSpot(300);
        expect(wave_x).toBe(0);
        expect(wave_y).not.toBe(0);
    });

    it("calculateWaveSpot test 4", function () {
        calculateWaveSpot(5000);
        expect(wave_x).not.toBe(0);
        expect(wave_y).toBe(0);
    });

    it("isFlickingUp tests", function () {
        input_method = 'swipe';
        upFlick = true;
        expect(isFlickingUp()).toBe(true);
        upFlick = false;
        expect(isFlickingUp()).toBe(false);

        input_method = 'accelerometer';
        accelerationZ = 0;
        accelerationY = 0;
        expect(isFlickingUp()).toBe(false);

        accelerationZ = -upperbound * 3;
        expect(isFlickingUp()).toBe(true);

        accelerationY = -upperbound * 3;
        expect(isFlickingUp()).toBe(true);

        accelerationZ = 0;
        expect(isFlickingUp()).toBe(true);
    });

    it("isFlickingLeft tests", function () {
        input_method = 'swipe';
        leftFlick = true;
        expect(isFlickingLeft()).toBe(true);
        leftFlick = false;
        expect(isFlickingLeft()).toBe(false);

        input_method = 'accelerometer';
        accelerationX = 0;
        expect(isFlickingLeft()).toBe(false);

        accelerationX = leftbound * 3;
        expect(isFlickingLeft()).toBe(true);

        accelerationX = leftbound * 0.5;
        expect(isFlickingLeft()).toBe(false);
    });

    it("isFlickingRight tests", function () {
        input_method = 'swipe';
        rightFlick = true;
        expect(isFlickingRight()).toBe(true);
        rightFlick = false;
        expect(isFlickingRight()).toBe(false);

        input_method = 'accelerometer';
        accelerationX = 0;
        expect(isFlickingRight()).toBe(false);

        accelerationX = rightbound * 3;
        expect(isFlickingRight()).toBe(true);

        accelerationX = rightbound * 0.5;
        expect(isFlickingRight()).toBe(false);
    });
});