var animalVariations = [];
animalVariations[0] = [175, 66, 0];	// Normal
animalVariations[1] = [50, 50, 50];		// Black
animalVariations[2] = [2, 52, 125];		// Blue
animalVariations[3] = [136, 168, 5];	// Green
animalVariations[4] = [255, 102, 0];	// Orange
animalVariations[5] = [215, 139, 169];	// Pink
animalVariations[6] = [102, 0, 128];	// Purple
animalVariations[7] = [212, 0, 3];		// Red
animalVariations[8] = [255, 204, 164];	// White
animalVariations[9] = [255, 198, 12];	// Yellow

var colorOffset = 30;

function generateTintImage(img, rgbks, red, green, blue) {
    var buff = document.createElement("canvas");
    buff.width = img.width;
    buff.height = img.height;

    var ctx = buff.getContext("2d");

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(rgbks[3], 0, 0);

    ctx.globalCompositeOperation = 'lighter';
    if (red > 0) {
        ctx.globalAlpha = Math.min(1.0, red / 255.0);
        ctx.drawImage(rgbks[0], 0, 0);
    }
    if (green > 0) {
        ctx.globalAlpha = Math.min(1.0, green / 255.0);
        ctx.drawImage(rgbks[1], 0, 0);
    }
    if (blue > 0) {
        ctx.globalAlpha = Math.min(1.0, blue / 255.0);
        ctx.drawImage(rgbks[2], 0, 0);
    }

    return buff;
}

var starredSprites = [];
var sprites = [];
var testImg;

var animalImage = [];
var flagImage = [];
var waveImage;
var wavePattern;
var monkeyRGBKs;
var raccoonRGBKs;


function setAnimalVariation(variation) {
	if(teamID == 0)
	{
		// Team monkey
		animalImage['normal'] = generateTintImage(animalImage['monkey_normal'], monkeyRGBKs, animalVariations[variation][0] + colorOffset, animalVariations[variation][1] + colorOffset, animalVariations[variation][2] + colorOffset);
		animalImage['head'] = generateTintImage(animalImage['monkeyhead'], monkeyheadRGBKs, animalVariations[variation][0] + colorOffset, animalVariations[variation][1] + colorOffset, animalVariations[variation][2] + colorOffset);
	}
	else
	{
		// Team raccoon
		animalImage['normal'] = generateTintImage(animalImage['raccoon_normal'], raccoonRGBKs, animalVariations[variation][0] + colorOffset, animalVariations[variation][1] + colorOffset, animalVariations[variation][2] + colorOffset);
		animalImage['head'] = generateTintImage(animalImage['raccoonhead'], raccoonheadRGBKs, animalVariations[variation][0] + colorOffset, animalVariations[variation][1] + colorOffset, animalVariations[variation][2] + colorOffset);
    }
	colorMonkeyHead();
}

function setUpImages() {
    animalImage['monkey_normal'] = loadImage('/assets/images/monkey_normal.png');
    animalImage['monkeyhead'] = loadImage('/assets/images/monkeyhead.png');
    monkeyRGBKs = generateRGBKs(animalImage['monkey_normal']);
    monkeyheadRGBKs = generateRGBKs(animalImage['monkeyhead']);
	
	animalImage['raccoon_normal'] = loadImage('/assets/images/raccoon_normal.png');
	animalImage['raccoonhead'] = loadImage('/assets/images/raccoonhead.png');
    raccoonRGBKs = generateRGBKs(animalImage['raccoon_normal']);
    raccoonheadRGBKs = generateRGBKs(animalImage['raccoonhead']);
	
	animalImage['normal'] = animalImage['monkey_normal'];
	animalImage['head'] = animalImage['monkeyhead'];

    waveImage = loadImage('/assets/images/wave.png');

    flagImage['red'] = loadImage('/assets/images/flag_red_small.png');
    flagImage['green'] = loadImage('/assets/images/flag_green_small.png');
}

function generateRGBKs(img) {
    var w = img.width;
    if (w == 0) {
        console.error('FATAL: Width of ' + img.src + ' is 0!');
    }
    var h = img.height;
    var rgbks = [];

    var rendercanvas = document.createElement("canvas");
    rendercanvas.width = w;
    rendercanvas.height = h;

    var renderctx = rendercanvas.getContext("2d");
    renderctx.drawImage(img, 0, 0);

    console.log(img.src);
    var pixels = renderctx.getImageData(0, 0, w, h).data;
    console.log(img.src);

    // 4 is used to ask for 3 images: red, green, blue and
    // black in that order.
    for (var rgbI = 0; rgbI < 4; rgbI++) {
        var rendercanvas = document.createElement("canvas");
        rendercanvas.width = w;
        rendercanvas.height = h;

        var renderctx = rendercanvas.getContext('2d');
        renderctx.drawImage(img, 0, 0);
        var to = renderctx.getImageData(0, 0, w, h);
        var toData = to.data;

        for (
            var i = 0, len = pixels.length;
            i < len;
            i += 4
        ) {
            toData[i] = (rgbI === 0) ? pixels[i] : 0;
            toData[i + 1] = (rgbI === 1) ? pixels[i + 1] : 0;
            toData[i + 2] = (rgbI === 2) ? pixels[i + 2] : 0;
            toData[i + 3] = pixels[i + 3];
        }

        renderctx.putImageData(to, 0, 0);

        // image is _slightly_ faster then canvas for this, so convert
        var imgComp = new Image();
        imgComp.src = rendercanvas.toDataURL();

        rgbks.push(imgComp);
    }

    return rgbks;
}

var resoures_loaded = false;
var soundsToBeLoaded = 0;
var soundsLoaded = 0;
var sounds = [];
function newSoundLoaded() {
    soundsLoaded++;
    updateLoaded();
}

function updateLoadedSoundsInfo() {
    if (!document.getElementById('soundsLoadedInfo')) {
        return;
    }
    document.getElementById('soundsLoadedInfo').innerHTML = soundsLoaded + '/' + soundsToBeLoaded + ' sounds loaded';
}


var imagesToBeLoaded = 0;
var imagesLoaded = 0;
var images = [];
function newImageLoaded() {
    imagesLoaded++;
    updateLoaded();
}

function updateLoadedImagesInfo() {
    if (!document.getElementById('imagesLoadedInfo')) {
        return;
    }
    document.getElementById('imagesLoadedInfo').innerHTML = imagesLoaded + '/' + imagesToBeLoaded + ' images loaded';
}

function setLoadableImage(url, initializing) {
    imagesToBeLoaded++;
    images[url] = new Image();
    images[url].src = url;
    if (initializing) {
        updateLoaded();
        images[url].onload = newImageLoaded;
    }
}

function loadImage(url) {
    if (images[url]) {
        return images[url];
    }
    images[url] = new Image();
    images[url].src = url;
    return images[url];
}

function loadResources() {
    updateLoaded();
    // Images

    setLoadableImage("/assets/images/monkey_normal.png", 1);
	setLoadableImage("/assets/images/raccoon_normal.png", 1);
    setLoadableImage("/assets/images/holding_device.png", 1);
    setLoadableImage("/assets/images/swipe_up.png", 1);
    setLoadableImage("/assets/images/up_arrow.png", 1);
    setLoadableImage("/assets/images/monkeyhead.png", 1);
	setLoadableImage("/assets/images/raccoonhead.png", 1);
    setLoadableImage("/assets/images/wave.png", 1);
    setLoadableImage("/assets/images/flag_red_small.png", 1);
    setLoadableImage("/assets/images/flag_green_small.png", 1);

    // Sounds
    var soundData = [];
    // ADD THIS CODE LATER:
    soundData['hit'] = {url: '/assets/sounds/playerhit.mp3', required: true};
    soundData['kick'] = {url: '/assets/sounds/kick.mp3', required: true};
    soundData['jump'] = {url: '/assets/sounds/jump.mp3', required: true};
    //soundData['playerselectionMusic'] = {url: './sounds/Broken Reality.mp3', loop:true};

    loadSounds(soundData);
}

function setLoadedImages() {

}

var allSoundsLoaded = false;
var allImagesLoaded = false;
function updateLoaded() {
    if (!allImagesLoaded && imagesLoaded == imagesToBeLoaded) {
        allImagesLoaded = true;
        setLoadedImages();
    }
    if (imagesLoaded != imagesToBeLoaded) {
        allImagesLoaded = false;
    }
    if (soundsLoaded == soundsToBeLoaded) {
        allSoundsLoaded = true;
    }
    else {
        allSoundsLoaded = false;
    }
    if (!connected) {
        setLoadingText('Connecting to the game at ' + webSocket.socketURL + '...');
    }
    else if (!allImagesLoaded && !allSoundsLoaded) {
        setLoadingText('Loading sounds and images...');
    }
    else if (allImagesLoaded && !allSoundsLoaded) {
        setLoadingText('Loading sounds...');
    }
    else if (!allImagesLoaded && allSoundsLoaded) {
        setLoadingText('Loading images...');
    }
    else if (allImagesLoaded && allSoundsLoaded) {
        loaded = true;
        setLoadingText('Game loaded. Tap/Click the screen to continue');
        setUpImages();
        showJoinButtons();
    }
    updateLoadedSoundsInfo();
    updateLoadedImagesInfo();
}

function setLoadingText(text) {
    if (document.getElementById('loadingText')) {
        document.getElementById('loadingText').innerHTML = text;
    }
}