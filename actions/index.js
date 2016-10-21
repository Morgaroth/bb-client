import * as types from "../constants/ActionTypes";
import fetch from "isomorphic-fetch";
// import {
// gatesAtPosition,
// findNormalGatesHere,
// checkIfIsControlledStep,
// findControlledGatesHere
// } from "../reducers/index";

export function disconnected() {
    console.log("SOCKETIO disconnected")
}

export function connected() {
    console.log("SOCKETIO connected")
}

export function connecting() {
    console.log("SOCKETIO connecting")
}

export function connect(url, token) {
    return {
        type: types.SOCKET_CONNECT,
        url: url + ":8000",
        token: token
    }
}
export function messageReceived(data) {
    return {
        type: types.SEND_MESSAGE,
        data: data
    }
}

export function loadToken() {
    return (dispatch) => {
        dispatch({type: types.LOAD_TOKEN});
        dispatch(fetchRoomsFromServer());
    }
}

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') c = c.substring(1);
//         if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
//     }
//     return "";
// }
//
// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + ((exdays || 356) * 24 * 60 * 60 * 1000));
//     var expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + "; " + expires;
// }
//
//
// function getUserCookie() {
//     var userId = getCookie("user.id");
//     if (userId == "") {
//         userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//             var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//             return v.toString(16);
//         });
//         setCookie("user.id", userId);
//     }
//     return userId;
// }
//
function userHeader(state) {
    return {
        // headers: {'X-User-Auth': state.auth.token},
        headers: new Headers(Object.assign({}, {'X-User-Auth': state.auth.token})),
        mode: 'cors'
    }
}

export function selectRoom(id) {
    return (dispatch) => {
        dispatch({type: types.SELECT_ROOM, id: id});
        dispatch(loadSelectedRoom())
    }
}

export function changeServiceURL(serviceURL) {
    return (dispatch) => {
        dispatch({type: types.CHANGE_URL, newUrl: serviceURL});
        dispatch(loadToken());
    }
}


export function tryLogin(phone) {
    return prepareLogin(phone)
}

export function prepareLogin(phone) {
    console.log("Preparing login with phone:", phone);
    return (dispatch, getState) => {
        return fetch(getState().auth.url + ':8001/users/auth/' + phone)
            .then(response => response.json())
            .then(json => dispatch(proceedLogin(phone, json.code)));
    }
}

export function proceedLogin(phone, code) {
    console.log("Logging with phone:", phone, code);
    return (dispatch, getState) => {
        return fetch(getState().auth.url + ':8001/users/auth/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({phoneNumber: phone, smsCode: code})
        }).then(response => response.json())
            .then(json => dispatch(saveUserToken(json)));

    }
}


export function saveUserToken(json) {
    return {
        type: types.SAVE_TOKEN, data: json
    }
}

export function refreshRoomsList(json) {
    return {
        type: types.REFRESH_ROOMS_LIST, data: json
    }
}
export function sendMessage(roomId, message) {
    return {
        type: types.SEND_MESSAGE, roomId: roomId, msg: message
    }
}

export function loadSelectedRoom() {
    return (dispatch, getState) => {
        dispatch(connect(getState().auth.url, getState().auth.token))
    }
}

//
// export function executeCreateCPU(newCpuSize, isFull = undefined) {
//     return (dispatch, getState) => {
//         return fetch(getState().serviceUrl + '/cpu', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-User-Id': getUserCookie()
//             },
//             mode: 'cors',
//             body: JSON.stringify({size: newCpuSize, full: isFull || false})
//         }).then(response => response.json())
//             .then(json => dispatch(handleNewCPU(json)))
//             .then(() => dispatch(fetchSelectedCPU()));
//
//     }
// }
//
export function fetchRoomsFromServer() {
    return (dispatch, getState) => {
        if (!getState().auth.needsLogin) {
            return fetch(getState().auth.url + ':8001/rooms', userHeader(getState()))
                .then(response => response.json())
                .then(json => dispatch(refreshRoomsList(json)))
                .then(() => dispatch(loadSelectedRoom()));
        } else {
            console.log("not fetching, login is disabled")
        }
    }
}

// function doMove(delta, deltaPos) {
//     return (cpuId) => {
//         return (dispatch, getState) => {
//             var state = getState();
//             var cpu = state.serverState.selected;
//             var execPos = state.execution[cpu].position + deltaPos;
//             var gates = state.algorithms[cpu] || [];
//             var toExec = gatesAtPosition(gates, execPos);
//             var req = [];
//             if (toExec.length == 0) {
//                 return dispatch({type: types.MOVE, cpuId: cpuId, delta: delta})
//             } else if (checkIfIsControlledStep(toExec)) {
//                 var o = findNormalGatesHere(toExec).map(x => {
//                     return {gate: x.gate.type, index: x.qbit}
//                 })[0];
//                 var c = findControlledGatesHere(toExec).map(x => x.qbit);
//                 req.push({gate: {gate: o.gate, controlBits: c}, index: o.index})
//             } else {
//                 toExec.map(g => {
//                     req.push({gate: g.gate.type, index: g.qbit})
//                 })
//             }
//             return fetch(state.serviceUrl + '/cpu/' + cpu, {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'X-User-Id': getUserCookie()
//                 },
//                 mode: 'cors',
//                 body: JSON.stringify(req)
//             }).then(response => console.log("received response", JSON.stringify()))
//                 .then(() => dispatch({type: types.MOVE, cpuId: cpuId, delta: delta}))
//                 .then(() => dispatch(fetchSelectedCPU()))
//         }
//     }
// };

// export function deleteSelectedCPU() {
//     return (dispatch, getState) => {
//         return fetch(getState().serviceUrl + '/cpu/' + getState().serverState.selected, {
//             method: 'DELETE',
//             headers: {
//                 'X-User-Id': getUserCookie()
//             },
//             mode: 'cors'
//         }).then(() => dispatch(selectRoom(null)))
//             .then(() => dispatch(fetchCPUsFromServer()));
//
//     }
// }