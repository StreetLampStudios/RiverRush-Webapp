<html>
<head>
  <meta name='viewport' content='width=device-width,user-scalable=no'>
  <title>Web app</title>
  <LINK href="./assets/styles/stylesheet.css" rel="stylesheet" type="text/css">
  <script type="text/javascript" src="./assets/scripts/resourceloading.js"></script>
  <script type="text/javascript" src="./assets/scripts/socket.js"></script>
  <script type="text/javascript" src="./assets/scripts/main.js"></script>
  <script type="text/javascript" src="./assets/scripts/events.js"></script>
  <script type="text/javascript" src="./assets/scripts/vibration.js"></script>
  <script type="text/javascript" src="./assets/scripts/howler.min.js"></script>
  <script type="text/javascript" src="./assets/scripts/sound.js"></script>
  <script src="./assets/scripts/touch-emulator.js"></script>
  <script type="text/javascript" src="./assets/scripts/NoSleep.min.js"></script>
  <script>TouchEmulator();</script>
</head>
<body>
<div id='wrapper'>
	<div style='background-color: white;' id='container'>
	  <input type='hidden' id='serverTXTContent' value='<?php if (file_exists('server.txt')) {
		echo htmlentities(file_get_contents('server.txt'));
	  } ?>'>

	  <div id='lookAtMonitor' style='opacity: 0;'>
		<div class='inAnAbsoluteDiv'>
		  <div class='centeredVertically'><img src='./assets/images/up_arrow.png' style='vertical-align:middle'>
			<span>Look at the monitor to time your jumps</span></div>
		</div>
	  </div>
	  <div class='normalBackground'>
		<div id='upperBackground' style='background-color: white;'></div>
		<div id='underBackground' style='background-color: #3737ff;'></div>
	  </div>
	  <div class='overBackground'>
		<div class='canvasContainer'>
		   <div id='gameholder'>
			<canvas id='drawCanvas' width="400" height="400"></canvas>
			<div id='boatshower' style='width: 100%; left: 0%; display: block;'>
				<div style='position: relative;'>
				  <img src='/assets/images/boatshower.png' style='width: 100%;'>
				  <div id='animalLocation' style='position: absolute; left: 42%; bottom: 40%; display: inline-block; text-align: left; width: 100%;'>
					<img src='/assets/images/youpointer.png' style='width: 15%;'><br>
					<canvas id='monkeyhead' style='width: 15%;' width='107' height='107'></canvas>
				  </div>
			</div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
	<div id='swipehelp' style='opacity: 0;' class='overlaycontainer'>
	  <div class='overlay'>
		Swipe up to jump<br>
		Swipe left or right to roll
		<div class='upanimatecontainer'>
		  <img src='./assets/images/swipe_up.png' class='upanimateimage'>
		</div>
	  </div>
	</div>
	<div id='flickhelp' style='opacity: 0;' class='overlaycontainer'>
	  <div class='overlay'>
		Flick your device up to jump<br>
		Flick your device left or right to roll
		<div class='upanimatecontainer'>
		  <img src='./assets/images/holding_device.png' class='upanimateimage'>
		</div>
	  </div>
	</div>
	<div class='overlaycontainer' id='loadingscreen' style='opacity: 1; left: 0%; z-index: 2;'>
	  <div class='overlay' id='loadingcontent'>
		<span id='loadingText'>Loading...</span><br>
		<span id='imagesLoadedInfo'></span><br>
		<span id='soundsLoadedInfo'></span>
	  </div>
	</div>
</div>
</body>
</html>
