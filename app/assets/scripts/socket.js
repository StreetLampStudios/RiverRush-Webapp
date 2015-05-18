var webSocket = 
(function ()
{
	var socket;
	var connection = false;
	var displayFunction;
	var webSocket = {
		socketURL: "ws://localhost:"+window.prompt('Connect at which port?'),
		output: null,
		init: function()
		{
			output = document.getElementById("output");
			this.writeToScreen("WebSocket log:");
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
		onOpen: function(evt) { connection = true; this.writeToScreen("CONNECTED"); alert('connected to the server'); },
		onClose: function(evt) { connection = false; this.writeToScreen("DISCONNECTED"); },
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
			this.writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
		},
		onError: function(evt)
		{
			var errormsg = evt.data;
			connection = false;
			if(!evt.data)
			{
				errormsg = 'Could not connect to the server at '+this.socketURL;
			}
			this.writeToScreen('<span style="color: red;">ERROR:</span> ' + errormsg);
		},
		doSend: function(message)
		{
			if(!connection) { return; } // Only send something when a connection is open
			this.writeToScreen("SENT: " + message);
			socket.send(message);
		},
		writeToScreen: function(message)
		{
			var pre = document.createElement("p");
			pre.style.wordWrap = "break-word";
			pre.innerHTML = message;
			output.appendChild(pre);
		},
	};
	return webSocket;
}());