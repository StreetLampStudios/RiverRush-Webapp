<html>
  <head>
    <meta name='viewport' content='width=device-width,user-scalable=no'>
    <title>Web app</title>
    <LINK href="./assets/styles/stylesheet.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="./assets/scripts/socket.js"></script>
    <script type="text/javascript" src="./assets/scripts/main.js"></script>
	<script type="text/javascript" src="./assets/scripts/events.js"></script>
  </head>
  <body>
    <div style='background-color: white;' id='container'>
		<input type='hidden' id='serverTXTContent' value='<?php if(file_exists('server.txt')) { echo htmlentities(file_get_contents('server.txt')); } ?>'>
	  <div id='lookAtMonitor' style='opacity: 0;'><div class='inAnAbsoluteDiv'>
	  <div class='centeredVertically'><img src='./assets/images/up_arrow.png' style='vertical-align:middle'> <span>Look at the monitor to time your jumps</span></div>
	  </div></div>
	  <div class='normalBackground'>
		<div class='airBackground'></div>
		<div class='waterBackground'></div>
	  </div>
	  <div class='overBackground'>
		<canvas id='drawCanvas' width="400" height="400"></canvas>
	  </div>
	 </div>
    <div id='swipehelp' style='opacity: 0;' class='overlaycontainer'>
      <div class='overlay'>
      Swipe up to jump
        <div class='upanimatecontainer'>
          <img src='./assets/images/swipe_up.png' class='upanimateimage'>
        </div>
      </div>
    </div>
    <div id='flickhelp' style='opacity: 0;' class='overlaycontainer'>
      <div class='overlay'>
      Flick your device up to jump
        <div class='upanimatecontainer'>
          <img src='./assets/images/holding_device.png' class='upanimateimage'>
        </div>
      </div>
    </div>
    <div class='overlaycontainer' id='loadingscreen' style='opacity: 1; left: 0%; z-index: 2;'>
      <div class='overlay' id='loadingcontent'>
      Loading game...
      </div>
    </div>
  </body>
</html>
