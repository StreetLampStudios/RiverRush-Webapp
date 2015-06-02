var serverTXTContent = 'ws://localhost:82';

var webSocket =
  (function () {
    var socket;
    var connection = false;
    var displayFunction;
    var webSocket = {
      socketURL: serverTXTContent,
      init: function () {
        this.launchWebSocket();
      },
      setSocketURL: function () {
        if (document.getElementById('serverTXTContent')) {
          serverTXTContent = document.getElementById('serverTXTContent').value;
          this.socketURL = serverTXTContent;
        }
      },
      launchWebSocket: function () {
        this.setSocketURL();
        socket = new WebSocket(this.socketURL);
        socket.onopen = function (evt) {
          webSocket.onOpen(evt)
        };
        socket.onclose = function (evt) {
          webSocket.onClose(evt)
        };
        socket.onmessage = function (evt) {
          webSocket.onMessage(evt)
        };
        socket.onerror = function (evt) {
          webSocket.onError(evt)
        };
      },
      onOpen: function (evt) {
        connection = true;
        if (onLoadingScreen) {
          socketOpened();
        }
        console.log("CONNECTED");
      },
      onClose: function (evt) {
        connection = false;
        socketDisconnect();
        console.log("DISCONNECTED");
      },
      sendTest: function () {
        this.doSend(window.prompt("Send what?"));
      },
      sendJumpEvent: function () {
        this.doSend("event=JumpCommand");
      },
      sendJoinEvent: function () {
      },
      onMessage: function (evt) {
        console.log('RESPONSE: ' + evt.data);

        if (evt.data) {
          var datasplit = evt.data.split('=');
          if (datasplit.length == 2 && datasplit[0] == 'event') {
            console.log('EVENT RECEIVED: ' + datasplit[1]);
            switch (datasplit[1]) {
              case 'GameStartedEvent':
                GameStartedEvent();
                break;

              case 'GameStoppedEvent':
                GameStoppedEvent();
                break;

              case 'GameWaitingEvent':
                GameWaitingEvent();
                break;

              case 'GameFinishedEvent':
                GameFinishedEvent();
                break;

              case 'PlayerJumpedEvent':
                PlayerJumpedEvent();
                break;

              case 'PlayerFellEvent':
                PlayerFellEvent();
                break;
            }
          }
        }
      },
      onError: function (evt) {
        var errormsg = evt.data;
        connection = false;
        if (!evt.data) {
          errormsg = 'Could not connect to the server at ' + this.socketURL;
        }
        if (onLoadingScreen) {
          socketOpenError();
        } else {
          socketDisconnect();
        }
        console.log('CONNECTION ERROR: ' + errormsg);
      },
      doSend: function (message) {
        if (!connection) {
          return;
        } // Only send something when a connection is open
        console.log("SENT: " + message);
        socket.send(message);
      }
    };
    return webSocket;
  }());
