// enable vibration support
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

function vibrate(vibrateTime)
{
	if (navigator.vibrate) {
		// vibration API supported
		navigator.vibrate(vibrateTime);
	}
}