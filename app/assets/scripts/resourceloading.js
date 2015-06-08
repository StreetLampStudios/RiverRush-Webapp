var animalVariations = [];
animalVariations[0] = [255,50,50];
animalVariations[1] = [50,255,50];
animalVariations[2] = [50,50,255];
animalVariations[3] = [255,255,50];
animalVariations[4] = [50,255,255];
animalVariations[5] = [255,50,255];
animalVariations[6] = [100,100,100];
animalVariations[7] = [0,125,255];
animalVariations[8] = [150,30,165];
animalVariations[9] = [140,100,255];
animalVariations[10] = [255,100,100];

function generateTintImage( img, rgbks, red, green, blue ) {
	var buff = document.createElement( "canvas" );
	buff.width  = img.width;
	buff.height = img.height;
	
	var ctx  = buff.getContext("2d");

	ctx.globalAlpha = 1;
	ctx.globalCompositeOperation = 'copy';
	ctx.drawImage( rgbks[3], 0, 0 );

	ctx.globalCompositeOperation = 'lighter';
	if ( red > 0 ) {
		ctx.globalAlpha = red   / 255.0;
		ctx.drawImage( rgbks[0], 0, 0 );
	}
	if ( green > 0 ) {
		ctx.globalAlpha = green / 255.0;
		ctx.drawImage( rgbks[1], 0, 0 );
	}
	if ( blue > 0 ) {
		ctx.globalAlpha = blue  / 255.0;
		ctx.drawImage( rgbks[2], 0, 0 );
	}

	return buff;
}

var starredSprites = [];
var sprites = [];
var testImg;

var animalImage = [];
var waveImage;
var wavePattern;
var animalRGBKs;


function setAnimalVariation(variation)
{
	animalImage['normal'] = generateTintImage(animalImage['normal'], animalRGBKs, animalVariations[variation][0], animalVariations[variation][1], animalVariations[variation][2]);
}

function setUpImages()
{
	animalImage['normal'] = loadImage('/assets/images/monkey_normal.png');
	animalRGBKs = generateRGBKs(animalImage['normal']);

	waveImage = loadImage('/assets/images/wave.png');
}

function doSomething()
{
	sprites['animal'] = new Image();
	sprites['animal'].src = '/assets/images/monkey_normal.png';
	for(var i in sprites)
	{
		console.log(i);
		starredSprites[i] = generateRGBKs(sprites[i]);
		testImg = generateTintImage(sprites[i], starredSprites[i], 255, 0, 0);
	}
}
	
function generateRGBKs( img ) {
	var w = img.width;
	if(w == 0)
	{
		console.error('FATAL: Width of '+img.src+' is 0!');
	}
	var h = img.height;
	var rgbks = [];

	var rendercanvas = document.createElement("canvas");
	rendercanvas.width = w;
	rendercanvas.height = h;
	
	var renderctx = rendercanvas.getContext("2d");
	renderctx.drawImage( img, 0, 0 );
	
	console.log(img.src);
	var pixels = renderctx.getImageData( 0, 0, w, h ).data;
	console.log(img.src);

	// 4 is used to ask for 3 images: red, green, blue and
	// black in that order.
	for ( var rgbI = 0; rgbI < 4; rgbI++ ) {
		var rendercanvas = document.createElement("canvas");
		rendercanvas.width  = w;
		rendercanvas.height = h;
		
		var renderctx = rendercanvas.getContext('2d');
		renderctx.drawImage( img, 0, 0 );
		var to = renderctx.getImageData( 0, 0, w, h );
		var toData = to.data;
		
		for (
				var i = 0, len = pixels.length;
				i < len;
				i += 4
		) {
			toData[i  ] = (rgbI === 0) ? pixels[i  ] : 0;
			toData[i+1] = (rgbI === 1) ? pixels[i+1] : 0;
			toData[i+2] = (rgbI === 2) ? pixels[i+2] : 0;
			toData[i+3] =                pixels[i+3]    ;
		}
		
		renderctx.putImageData( to, 0, 0 );
		
		// image is _slightly_ faster then canvas for this, so convert
		var imgComp = new Image();
		imgComp.src = rendercanvas.toDataURL();
		
		rgbks.push( imgComp );
	}

	return rgbks;
}




var resoures_loaded = false;
var soundsToBeLoaded = 0;
var soundsLoaded = 0;
var sounds = [];
function newSoundLoaded()
{
	soundsLoaded++;
	updateLoaded();
}

function updateLoadedSoundsInfo()
{
	if(!document.getElementById('soundsLoadedInfo')){ return; }
	document.getElementById('soundsLoadedInfo').innerHTML = soundsLoaded + '/' + soundsToBeLoaded + ' sounds loaded';
}


var imagesToBeLoaded = 0;
var imagesLoaded = 0;
var images = [];
function newImageLoaded()
{
	imagesLoaded++;
	updateLoaded();
}

function updateLoadedImagesInfo()
{
	if(!document.getElementById('imagesLoadedInfo')){ return; }
	document.getElementById('imagesLoadedInfo').innerHTML = imagesLoaded + '/' + imagesToBeLoaded + ' images loaded';
}

function setLoadableImage(url,initializing)
{
	imagesToBeLoaded++;
	images[url] = new Image();
	images[url].src = url;
	if(initializing)
	{
		updateLoaded();
		images[url].onload = newImageLoaded;
	}
}

function loadImage(url)
{
	if(images[url])
	{
		return images[url];
	}
	images[url] = new Image();
	images[url].src = url;
	return images[url];
}

function loadResources()
{
	updateLoaded();
	// Images
	
	setLoadableImage("/assets/images/monkey_normal.png",1);
	setLoadableImage("/assets/images/holding_device.png",1);
	setLoadableImage("/assets/images/swipe_up.png",1);
	setLoadableImage("/assets/images/up_arrow.png",1);
	setLoadableImage("/assets/images/wave.png",1);
	
	// Sounds
	var soundData = [];
	/*soundData['playerhit'] = {url: './sounds/playerhit.mp3',required:true};
	soundData['playerselectionMusic'] = {url: './sounds/Broken Reality.mp3',loop:true};*/
	
	//loadSounds(soundData);
}

function setLoadedImages()
{
	
}

var allSoundsLoaded = false;
var allImagesLoaded = false;
function updateLoaded()
{
	if(!allImagesLoaded && imagesLoaded == imagesToBeLoaded)
	{
		allImagesLoaded = true;
		setLoadedImages();
	}
	if(imagesLoaded != imagesToBeLoaded)
	{
		allImagesLoaded = false;
	}
	if(soundsLoaded == soundsToBeLoaded)
	{
		allSoundsLoaded = true;
	}
	else
	{
		allSoundsLoaded = false;
	}
	if(!connected)
	{
		document.getElementById('loadingText').innerHTML = 'Connecting to the game at '+webSocket.socketURL+'...';
	}
	else if(!allImagesLoaded && !allSoundsLoaded)
	{
		document.getElementById('loadingText').innerHTML = 'Loading sounds and images...';
	}
	else if(allImagesLoaded && !allSoundsLoaded)
	{
		document.getElementById('loadingText').innerHTML = 'Loading sounds...';
	}
	else if(!allImagesLoaded && allSoundsLoaded)
	{
		document.getElementById('loadingText').innerHTML = 'Loading images...';
	}
	else if(allImagesLoaded && allSoundsLoaded)
	{
		loaded = true;
		document.getElementById('loadingText').innerHTML = 'Game loaded. Tap/Click the screen to continue';
		setUpImages();
		showJoinButtons();
	}
	updateLoadedSoundsInfo();
	updateLoadedImagesInfo();
}