// import actions from '../actions'
// import * as types from "../constants/ActionTypes";
// import createSocketIoMiddleware from 'redux-socket.io';
// import io from 'socket.io-client';
//
// const socketMiddleware = (function () {
//
//     var socket = null;zz
//     let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
//
//     const onOpen = (ws, store, token) => evt => {
//         //Send a handshake, or authenticate with remote end
//
//         //Tell the store we're connected
//         store.dispatch(actions.connected());
//     };
//
//     const onClose = (ws, store) => evt => {
//         //Tell the store we've disconnected
//         store.dispatch(actions.disconnected());
//     };
//
//     const onMessage = (ws, store) => evt => {
//         //Parse the JSON message received on the websocket
//         var msg = JSON.parse(evt.data);
//         switch (msg.type) {
//             case "CHAT_MESSAGE":
//                 //Dispatch an action that adds the received message to our state
//                 console.log('message received', evt.data, msg.type, evt);
//                 store.dispatch(actions.messageReceived(msg));
//                 break;
//             default:
//                 console.log("Received unknown message type: '" + msg.type + "'");
//                 break;
//         }
//     };
//
//     return store => next => action => {
//         switch (action.type) {
//
//             //The user wants us to connect
//             case types.SOCKET_CONNECT:
//                 //Start a new connection to the server
//                 if (socket != null) {
//                     socket.close();
//                 }
//                 //Send an action that shows a "connecting..." status for now
//                 store.dispatch(actions.connecting());
//
//                 //Attempt to connect (we could send a 'failed' action on error)
//                 socket = io('http://localhost:3000');
//                 socket.onmessage = onMessage(socket, store);
//                 socket.onclose = onClose(socket, store);
//                 socket.onopen = onOpen(socket, store, action.token);
//
//                 break;
//
//             //The user wants us to disconnect
//             case types.SOCKET_DISCONNECT:
//                 if (socket != null) {
//                     socket.close();
//                 }
//                 socket = null;
//
//                 //Set our state to disconnected
//                 store.dispatch(actions.disconnected());
//                 break;
//
//             //Send the 'SEND_MESSAGE' action down the websocket to the server
//             case types.SEND_MESSAGE:
//                 socket.send(JSON.stringify({test: action.data}));
//                 break;
//
//             //This action is irrelevant to us, pass it on to the next middleware
//             default:
//                 return next(action);
//         }
//     }
//
// })();
//
// export default socketMiddleware