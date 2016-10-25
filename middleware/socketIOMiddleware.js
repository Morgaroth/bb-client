import * as actions from "../actions";
import * as types from "../constants/ActionTypes";
import io from 'socket.io-client'

const socketMiddleware = (function () {

    var socket = null;

    const onMessage = (ws, store) => evt => {
        //Parse the JSON message received on the websocket
        console.log('received event', evt);
        // switch (msg.type) {
        //     case "CHAT_MESSAGE":
                //Dispatch an action that adds the received message to our state
        store.dispatch(actions.messageReceived(evt));
                // break;
            // default:
            //     console.log("Received unknown message type: '" + msg.type + "'");
            //     break;
        // }
    };

    return store => next => action => {
        switch (action.type) {

            //The user wants us to connect
            case types.SOCKET_CONNECT:
                //Start a new connection to the server
                if (socket != null) {
                    socket.close();
                }
                //Send an action that shows a "connecting..." status for now
                // store.dispatch(actions.connecting());

                if(action.token != null && action.token != undefined && action.token.length>0) {
                    socket = io.connect(action.url + '/chats', {query: {'X-User-Auth': action.token}});

                    socket.on('connect', function () {
                        console.log('SocketIO connected')
                    });
                    socket.on('event', function (data) {
                        console.log('data', data)
                    });
                    socket.on('disconnect', function () {
                        console.log('SocketIO disconnected')
                    });
                    socket.on('Message', onMessage(socket, store));
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
                socket.emit("Message", {roomId: action.roomId, rawText: action.msg, messageType: 'chat-message'});
                break;

            //This action is irrelevant to us, pass it on to the next middleware
            default:
                return next(action);
        }
    }

})();

export default socketMiddleware