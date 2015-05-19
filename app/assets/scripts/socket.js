var webSocket = 
(function ()
{
	var socket;
	var connection = false;
	var displayFunction;
	var webSocket = {
		socketURL: serverTXTContent,
		init: function()
		{
			this.launchWebSocket();
		},
		launchWebSocket: function()
		{
			socket = new WebSocket(this.socketURL);
			socket.onopen = function(evt) { webSocket.onOpen(evt) };
			socket.onclose = function(evt) { webSocket.onClose(evt) };
			socket.onmessage = function(evt) { webSocket.onMessage(evt) };
			socket.onerror = function(evt) { webSocket.onError(evt) };
		} ,
		onOpen: function(evt) { connection = true; if(onLoadingScreen) { socketOpened(); } console.log("CONNECTED"); },
		onClose: function(evt) { connection = false; socketDisconnect(); console.log("DISCONNECTED"); },
		sendTest: function()
		{
			this.doSend(window.prompt("Send what?"));
		},
		sendJumpEvent: function()
		{
			this.doSend("event=JumpEvent");
		},
		onMessage: function(evt)
		{
			if(evt.data == 'fall')
			{
				doFall = true;
			}
			console.log('RESPONSE: ' + evt.data);
		},
		onError: function(evt)
		{
			var errormsg = evt.data;
			connection = false;
			if(!evt.data)
			{
				errormsg = 'Could not connect to the server at '+this.socketURL;
			}
			if(onLoadingScreen) { socketOpenError(); } else { socketDisconnect(); }
			console.log('CONNECTION ERROR: ' + errormsg);
		},
		doSend: function(message)
		{
			if(!connection) { return; } // Only send something when a connection is open
			console.log("SENT: " + message);
			socket.send(message);
		},
	};
	return webSocket;
}());