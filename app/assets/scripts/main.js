var input_method;

var accelerationX;
var accelerationY;
var accelerationZ;
var xOffset = 0;
var yOffset = 0;
var zOffset = 0;

var accelerometer_supported = -1;
window.ondevicemotion = function (e) {
  if (accelerometer_supported < 1 && event && event.acceleration && event.acceleration.x) {
    accelerometer_supported++;
  }
  
  accelerationX = event.acceleration.x;
  accelerationY = event.acceleration.y;
  accelerationZ = event.acceleration.z;
  checkFlick();
}

var teamID;
var teamName = '';
var teamNames = ['Team Pirate', 'Team Robot'];
var animalY = 0;
var animalYspeed = 0;

var animalJump = 0;
var animalFall = 0;
var animalDisplayFall = 0;
var animalGetUp = 0;
var animalVariation;

var overlayvisible = true;
var gamestate = 'loading';

var w = 0;
var h = 0;

var servergamestate = 'waitingForState';

function turnOffOverlay() {
  if (overlayvisible) {
    overlayvisible = false;
    document.getElementById('flickhelp').style.opacity = 0;
    document.getElementById('swipehelp').style.opacity = 0;
    document.getElementById('lookAtMonitor').style.opacity = 1;
  }
}

function moveCommand(directionCode, timestamp) {
  webSocket.sendVoteBoatMoveCommand(directionCode);
}

function jump(timestamp) {
  turnOffOverlay();
  animalJump = timestamp;
  // Send jump signal here
  webSocket.sendJumpEvent();
  gotDroppedEvent = false;
}

function vote(direction, timestamp) {
	moveCommand(direction, timestamp);
	animalVoteDirection = direction;
	animalVoteTime = timestamp;
}

function fall(timestamp) {
  vibrate(500);
  animalFall = timestamp;
  animalDisplayFall = Math.max(animalFall, animalJump + 1000);
}

function getUp(timestamp) {
  animalGetUp = timestamp;
}

var onLoadingScreen = true;
var connected = false;

function socketOpened() {
	connected = true;
	updateLoaded();
}

var sectors = [];
sectors['FRONT'] = 1;
sectors['FRONT_MIDDLE'] = 2;
sectors['MIDDLE'] = 3;
sectors['BACK_MIDDLE'] = 4;
sectors['BACK'] = 5;
function setAnimalSector(sector)
{
	sectorID = sectors[sector];
	document.getElementById('animalLocation').style.left = 14 + sectorID * 14 + '%';
}

var totalInLine = 5;
function setAnimalNumberInLine(numberInLine)
{
	inLinePercentage = numberInLine/totalInLine;
	document.getElementById('animalLocation').style.bottom = 80 - inLinePercentage * 75 + '%';
}

function resizeBoat(newWidth)
{
	document.getElementById('boatshower').style.width = newWidth + '%';
}

function showJoinButtons() {
  // Decide on input method
  console.log(window.DeviceMotionEvent);
  if (accelerometer_supported == 1) {
    input_method = 'accelerometer';
    document.getElementById('flickhelp').style.opacity = 0.8;
  }
  else {
    input_method = 'swipe';
    document.getElementById('swipehelp').style.opacity = 0.8;
  }

  document.getElementById('loadingcontent').innerHTML = '<span class="choosesidetitle">Choose a side</span><br><br><input class="choosesidebutton" id="sideleftbutton" type="button" value="Left" onClick="choose_side(\'left\');"> <input class="choosesidebutton" id="siderightbutton" type="button" value="Right" onClick="choose_side(\'right\');">';
  c = document.getElementById("drawCanvas");
  ctx = c.getContext("2d");
  onLoadingScreen = false;
  
  monkeyheadc = document.getElementById("monkeyhead");
  monkeyheadctx = monkeyheadc.getContext("2d");
  
  wavePattern = createPattern(waveImage);
}

function colorMonkeyHead()
{
	monkeyheadctx.drawImage(animalImage['head'],0,0,107,107);
}

function createPattern(image) {
  var patternSize = image.width;
  var patternCanvas = document.createElement('canvas');
  patternCanvas.width = image.width;
  patternCanvas.height = image.height;
  var patternCtx = patternCanvas.getContext("2d");
  patternCtx.drawImage(image, 0, 0, patternSize, patternSize);

  return ctx.createPattern(patternCanvas, 'repeat-x');
}

function socketOpenError() {
  socketDisconnectShowing = true;
  document.getElementById('loadingcontent').innerHTML = '<span class="connectError">Could not connect to the server</span><br><br><a href="/"><button>Retry</button></a>';
  onLoadingScreen = false;
}

var socketDisconnectShowing = false;
function socketDisconnect() {
  if (socketDisconnectShowing) {
    return;
  }
  socketDisconnectShowing = true;
  document.getElementById('loadingscreen').innerHTML = '<div class="overlay" id="loadingcontent"><span class="connectError">Connection to the server was lost</span><br><br><a href="/"><button>Reconnect</button></a></div>';
  //document.getElementById('loadingscreen').style.opacity = 1;
  document.getElementById('loadingscreen').style.left = '0%';
}

function startStepping(timestamp) {
	locationShowing = timestamp;
	step(timestamp);
}

function updateBoatProgress(progress) {
	if(document.getElementById('boatshower').style.width == '30%')
	{
		document.getElementById('boatshower').style.right = Math.max(Math.min(progress,100),0) * 0.7 + '%';
	}
}

function step(timestamp) {
  if (gamestate == 'game') {
    stepgame(timestamp);
  }
  window.requestAnimationFrame(step);
}


var doFall = false;
var doGetUp = false;
var gotDroppedEvent = true;

var locationShowing = 0;
var flickingDisabled = 0;

var rightbound = 10;
var leftbound = -10;
var upperbound = 7.5;

function checkWindowSize() {
  if (w != window.innerWidth || h != window.innerHeight) {
    // Resize
    console.log('Resize detected');
    w = window.innerWidth;
    h = window.innerHeight;

    if (w > h) {
      // Landscape
      document.getElementById('drawCanvas').style.width = 'auto';
      document.getElementById('drawCanvas').style.height = '100%';
    }
    else {
      // Portrait
      document.getElementById('drawCanvas').style.width = '100%';
      document.getElementById('drawCanvas').style.height = 'auto';
    }
  }
}

var animalVoteDirection;
var animalVoteTime = 0;

function stepgame(timestamp) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 400, 400);

  var animalY = 0;
  var animalX = 0;
  var animalRotation = 0;

  checkWindowSize();
  
  if(locationShowing && locationShowing < timestamp - 3000)
  {
	locationShowing = 0;
	resizeBoat(30);
  }

  if (doFall) {
    doFall = false;
    // Fall
    fall(timestamp);
  }
  if (doGetUp) {
    doGetUp = false;
    // Fall
    getUp(timestamp);
  }
  if(flickingDisabled < timestamp)
  {
	  if (isFlickingUp() && animalJump == 0 && animalFall == 0 && gotDroppedEvent) {
		// Jump
		jump(timestamp);
		flickingDisabled = timestamp + 500;
	  }
	  if(isFlickingRight() && animalJump == 0 && animalFall == 0)
	  {
		vote('RIGHT', timestamp);
		flickingDisabled = timestamp + 500;
	  }
	  if(isFlickingLeft() && animalJump == 0 && animalFall == 0)
	  {
		vote('LEFT', timestamp);
		flickingDisabled = timestamp + 500;
	  }
  }
  if (animalJump != 0) {
    if (animalJump < timestamp - 1000) {
      animalJump = 0;
    }
    else {
      // Jump the animal
      var x = animalJump + 1000 - timestamp;
      animalY = -(3 / 5000) * Math.pow(x - 500, 2) + 150;
    }
  }
  if (animalDisplayFall < timestamp && animalFall != 0) {
    if (timestamp - animalDisplayFall < 500) {
      animalY = -(timestamp - animalDisplayFall) / 500 * 80;
    }
    else if (timestamp - animalDisplayFall >= 500 && animalGetUp == 0) {
      animalY = -80;
    }
    else if (animalGetUp != 0 && animalGetUp + 500 < timestamp) {
      animalFall = 0;
      animalDisplayFall = 0;
      animalGetUp = 0;
    }
    else if (animalGetUp != 0) {
      animalY = -80 + (timestamp - animalGetUp) / 500 * 80;
    }
  }
  
  if(animalVoteTime && animalVoteTime > timestamp - 5000)
  {
	if(animalVoteDirection == 'LEFT')
	{
		ctx.drawImage(flagImage['green'], 160 + animalX - 40 + 20, 340 - 80 - 80 + 10 - animalY, 40, 40);
	}
	else
	{
		ctx.drawImage(flagImage['red'], 160 + animalX + 80 - 15, 340 - 80 - 80 + 10 - animalY, 40, 40);
	}
  }
  upFlick = false;
  rightFlick = false;
  leftFlick = false;

  calculateWaveSpot(timestamp);

  var offset_x = 160 + animalX + 40;
  var offset_y = 340 - 80 - 80 + 10 - animalY + 40;
  ctx.fillStyle = 'brown';
  ctx.translate(offset_x, offset_y);
  ctx.rotate(animalRotation); 
  ctx.drawImage(animalImage['normal'], -40, -40, 80, 80);
  ctx.rotate(-animalRotation); 
  ctx.translate(-offset_x, -offset_y);
  ctx.fillRect(100, 340 - 80, 200, 80);
  ctx.font = "20px Arial";
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  ctx.fillText(teamName,200,340-50);
  

  ctx.fillStyle = '#3737ff';
  ctx.fillRect(0, 340, 400, 80);

  ctx.fillStyle = wavePattern;
  offset_x = -wave_x;
  offset_y = 340 - 60 - wave_y;
  ctx.translate(offset_x, offset_y);
  ctx.fillRect(0, 0, 480, 80);
  ctx.translate(-offset_x, -offset_y);
}

var wave_x = 0;
var wave_y = 0;

function calculateWaveSpot(timestamp) {
  wave_x = (timestamp % 300) / 300 * 80;
  wave_y = Math.sin((timestamp % 5000) / 5000 * 2 * Math.PI) * 14;
}

var c;
var ctx;

var monkeyheadc;
var monkeyheadctx;

function sendTest() {
  webSocket.sendTest();
}

window.onload = function () {
  // Connect to the socket
  webSocket.init();
  loadResources();
  updateLoaded();
}

function choose_side(side) {
	// Decide on input method
  console.log(window.DeviceMotionEvent);
  if (accelerometer_supported == 1) {
    input_method = 'accelerometer';
    document.getElementById('flickhelp').style.opacity = 0.8;
  }
  else {
    input_method = 'swipe';
    document.getElementById('swipehelp').style.opacity = 0.8;
  }
  
	var team = 0;
  if (side == 'right') {
    document.getElementById('loadingscreen').style.left = '-100%';
	team = 1;
  }
  else {
    // left side chosen
    document.getElementById('loadingscreen').style.left = '100%';
  }
  // Send join event
  webSocket.sendJoinEvent(team);
  
  
  gamestate = 'game';
  window.requestAnimationFrame(startStepping);
}

var a = false;
var flickDisabled = 0;
function isFlickingUp() {
  return (((accelerationZ * 1.5 + accelerationY)/1.5 < -upperbound) && input_method == 'accelerometer') || (upFlick && input_method == 'swipe');
}

function isFlickingLeft() {
  return (accelerationX < leftbound && input_method == 'accelerometer') || (leftFlick && input_method == 'swipe');

}

function isFlickingRight() {
  return (accelerationX > rightbound && input_method == 'accelerometer') || (rightFlick && input_method == 'swipe');

}

function checkFlick() {
  y = Math.round(accelerationY - yOffset);
  z = Math.round(accelerationZ - zOffset);
  x = Math.round(accelerationX - xOffset);
}

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
//document.addEventListener('mousedown', handleTouchStart, false);
//document.addEventListener('mouseup', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
};

var upFlick = false;
var leftFlick = false;
var rightFlick = false;

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
    if (xDiff > 0) {
      /* left swipe */
	  leftFlick = true;
    } else {
      /* right swipe */
	  rightFlick = true;
    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
      upFlick = true;
    } else {
      /* down swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
};

var totalx = 0;
var totaly = 0;
var totalz = 0;

var meanx = 0;
var meany = 0;
var meanz = 0;

var calibrateOffset = 0.8;

var donetime = new Date().getTime() + 5000;
var amountOfMeasures = 0;
