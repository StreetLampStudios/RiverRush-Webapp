var input_method;

var accelerationX;
var accelerationY;
var accelerationZ;
var xOffset = 0;
var yOffset = 0;
var zOffset = 0;

var accelerometer_supported = -1;
window.ondevicemotion = function(e) {
if(accelerometer_supported < 1)
{
  accelerometer_supported++;
}
  accelerationX = event.acceleration.x;
  accelerationY = event.acceleration.y;
  accelerationZ = event.acceleration.z;
checkFlick();
}


monkeyY = 0;
monkeyYspeed = 0;

monkeyJump = 0;

var overlayvisible = true;
var gamestate = 'loading';

function turnOffOverlay()
{
if(overlayvisible)
{
  overlayvisible = false;
  if(input_method == 'accelerometer')
  {
	document.getElementById('flickhelp').style.opacity = 0;
  }
  else
  {
	document.getElementById('swipehelp').style.opacity = 0;
  }
}
}

function jump(timestamp)
{
	turnOffOverlay();
	monkeyJump = timestamp;
	// Send jump signal here
	webSocket.sendJumpEvent();
}

var onLoadingScreen = true;

function socketOpened()
{
	// Decide on input method
	console.log(window.DeviceMotionEvent);
	if (accelerometer_supported)
	{
	  input_method = 'accelerometer';
	  document.getElementById('flickhelp').style.opacity = 0.8;
	}
	else
	{
	  input_method = 'swipe';
	  document.getElementById('swipehelp').style.opacity = 0.8;
	}
	document.getElementById('loadingcontent').innerHTML = '<span class="choosesidetitle">Choose a side</span><br><br><input class="choosesidebutton" id="sideleftbutton" type="button" value="Left" onClick="choose_side(\'left\');"> <input class="choosesidebutton" id="siderightbutton" type="button" value="Right" onClick="choose_side(\'right\');">';
	c = document.getElementById("drawCanvas");
	ctx = c.getContext("2d");
	onLoadingScreen = false;
}

function socketOpenError()
{
	socketDisconnectShowing = true;
	document.getElementById('loadingcontent').innerHTML = '<span class="connectError">Could not connect to the server</span><br><br><a href="/"><button>Retry</button></a>';
	onLoadingScreen = false;
}

var socketDisconnectShowing = false;
function socketDisconnect()
{
	if(socketDisconnectShowing) { return;}
	socketDisconnectShowing = true;
	document.getElementById('loadingscreen').innerHTML = '<div class="overlay" id="loadingcontent"><span class="connectError">Connection to the server was lost</span><br><br><a href="/"><button>Reconnect</button></a></div>';
	//document.getElementById('loadingscreen').style.opacity = 1;
	document.getElementById('loadingscreen').style.left = '0%';
}

function step(timestamp) {
if(gamestate == 'game')
{
  stepgame(timestamp);
}
window.requestAnimationFrame(step);
}

function stepgame(timestamp) {

ctx.fillStyle = "#FFFF00";
ctx.fillRect(0,0,200,200);

var monkeyY = 0;

if(monkeyJump == 0 && isFlicking())
{
  // Jump
  jump(timestamp);
}
if(monkeyJump != 0)
{
  if(monkeyJump < timestamp - 1000)
  {
	monkeyJump = 0;
  }
  else
  {
	// Jump the monkey
	var x = monkeyJump + 1000 - timestamp;
	monkeyY = -(3/5000)*Math.pow(x - 500, 2) + 150;
  }
}
upFlick = false;

ctx.drawImage(monkeyImage['normal'],75,150 - monkeyY,50,50);

}

var c;
var ctx;

var monkeyImage = [];
monkeyImage['normal'] = new Image();
monkeyImage['normal'].src = './assets/images/monkey_normal.png';

function sendTest()
{
	webSocket.sendTest();
}

window.onload = function()
{	
	// Connect to the socket
	document.getElementById('loadingcontent').innerHTML = 'Connecting to the server at '+webSocket.socketURL+'...';
	webSocket.init();
}

function choose_side(side)
{
	if(side == 'right')
	{
		document.getElementById('loadingscreen').style.left = '-100%';
	}
	else
	{
	  // left side chosen
	  document.getElementById('loadingscreen').style.left = '100%';
	}
	gamestate = 'game';
	window.requestAnimationFrame(step);

	//document.getElementById('loadingscreen').style.opacity = 0;
	//setTimeout("var el = document.getElementById('loadingscreen'); el.parentNode.removeChild(el);",2000);
}

var a = false;
function isFlicking()
{
y = Math.round(accelerationY - yOffset);
z = Math.round(accelerationZ - zOffset);
return ((z > 8 || y < -8) && input_method == 'accelerometer') || (upFlick && input_method == 'swipe');
}

function checkFlick()
{
document.getElementById('debuginfo').innerHTML = 'Acceleration X: '+Math.round(accelerationX - xOffset)+'<br>Acceleration Y:'+Math.round(accelerationY - yOffset)+'<br>Acceleration Z:'+Math.round(accelerationZ - zOffset);
y = Math.round(accelerationY - yOffset);
z = Math.round(accelerationZ - zOffset);
if(isFlicking())
{
  document.getElementById('container').style.backgroundColor = 'red';
}
else
{
  document.getElementById('container').style.background = 'white';
}
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

function handleTouchMove(evt) {
  if ( ! xDown || ! yDown ) {
	  return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
	  if ( xDiff > 0 ) {
		  /* left swipe */
	  } else {
		  /* right swipe */
	  }
  } else {
	  if ( yDiff > 0 ) {
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