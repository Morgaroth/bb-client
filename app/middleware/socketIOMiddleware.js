import * as actions from "../actions";
import * as types from "../constants";
import io from "socket.io-client";

var WebSocketServer = {
  isConnected: false,
  socket: null,
  interval: null,
  onMessage: (ws, store, fun) => evt => {
    store.dispatch(fun(evt));
  },
  connect(url, token, store) {
    console.log("WEbSocket connect called");
    if (this.socket) {
      this.socket.destroy();
      delete this.socket;
      this.socket = null;
    }
    this.socket = io.connect(url, {
      reconnection: false,
      transports: ['websocket']
    });
    this.socket.on('connect', () => {
      this.isConnected = true;
      this.socket.on('Authorize', function (d) {
        console.log('Authorize', d)
      });
      window.setTimeout(() => {
        this.socket.emit('Authorize', {token: token});
      }, 100);
    });

    this.socket.on('Message', this.onMessage(this.socket, store, actions.messageReceived));

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      this.interval = window.setInterval(() => {
        if (this.isConnected) {
          clearInterval(this.interval);
          this.interval = null;
          return;
        }
        WebSocketServer.connect(url, token, store)
      }, 5000);
    });

    return this;
  }
};

const socketMiddleware = (function () {

  let socket = null;


  return store => next => action => {
    switch (action.type) {

      //The user wants us to connect
      case types.SOCKET_CONNECT:
        //Start a new connection to the server
        // if (socket != null) {
        // socket.close();
        // }
        //Send an action that shows a "connecting..." status for now
        // store.dispatch(actions.connecting());

        if (action.token != null && action.token !== undefined && action.token.length > 0) {
          console.log("connecting to", action.url, "after action", action);
          socket = WebSocketServer.connect(action.url + '/chats', action.token, store);

          // io.connect(
          //   action.url + '/chats', // uri
          //   { // opts
          //    // query: {'X-User-Auth': action.token},
          // transports: ['websocket'],
          // reconnection: true,
          // }
          // );

          // socket.on('connect', function () {
          //   console.log('SocketIO connected', socket);
          //   if (socket.socket) socket.socket.connect();
          //   socket.emit('Authorize', {token: action.token});
          //   if (socket.disconnected) {
          //     socket.disconnect(true);
          //     store.dispatch(actions.connect(action.url, action.token))
          //   }
          // });
          socket.socket.on('event', function (data) {
            console.log('data', data)
          });
          // socket.on('Authorize', function (data) {
          //   console.log('Authorize', data)
          // });
          // socket.on('disconnect', function () {
          //   console.log('SocketIO disconnected');
          //   store.dispatch(actions.connect(action.url, action.token))
          // });
          // socket.on('Message', onMessage(socket, store, actions.messageReceived));

          // socket.on('Suggestions', onMessage(socket, store, actions.updateSuggestions));
        } else {
          console.log('SocketIO: No token, no connect')
        }
        break;

      //The user wants us to disconnect
      case types.SOCKET_DISCONNECT:
        if (socket != null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        console.log('socket disconnected');
        // store.dispatch(actions.disconnected());
        break;

      case types.SEND_MESSAGE:
        let msg = {roomId: action.roomId, messageType: 'chat-message', rawText: action.msg};
        if (action.blocks !== undefined) {
          let b = action.blocks.reverse().map(x => x.reverse());
          msg.rawText = b.flatMap(x => x).map(x => x.text).join(' ');
          msg.betBrowserBlocks = b
        }
        socket.socket.emit("Message", msg);
        break;

      case types.FIND_SUGESTIONS:
        socket.emit("Suggest", {message: action.message});
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware