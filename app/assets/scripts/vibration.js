// enable vibration support
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
 
if (navigator.vibrate) {
    // vibration API supported
}

function vibrate(vibrateTime)
{
	navigator.vibrate(vibrateTime);
}