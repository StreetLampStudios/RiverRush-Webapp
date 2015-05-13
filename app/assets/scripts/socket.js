var webSocket = 
(function ()
{
	var socket;
	var connection;
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
		onOpen: function(evt) { webSocket.writeToScreen("CONNECTED"); alert('connected to the server'); },
		onClose: function(evt) { webSocket.writeToScreen("DISCONNECTED"); },
		sendTest: function()
		{
			webSocket.doSend(window.prompt("Send what?"));
		},
		onMessage: function(evt)
		{
			alert('response got');
			this.writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
			socket.close();
		},
		onError: function(evt)
		{
			var errormsg = evt.data;
			if(!evt.data)
			{
				errormsg = 'Could not connect to the server at '+this.socketURL;
			}
			this.writeToScreen('<span style="color: red;">ERROR:</span> ' + errormsg);
		},
		doSend: function(message)
		{
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