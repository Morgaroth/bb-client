import * as types from "../constants/ActionTypes";
import fetch from "isomorphic-fetch";
import {merge} from "../commons/index";

function bbOpts(state, oth) {
    return merge({
        headers: {'X-User-Auth': state.auth.token},
        mode: 'cors'
    }, oth || {})
}

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
        type: types.UPDATE_ROOM_HISTORY,
        roomId: data.roomId,
        messages: [data]
    }
}

export function loadToken() {
    return (dispatch, getState) => {
        dispatch({type: types.LOAD_TOKEN});
        dispatch(fetchRoomsFromServer());
        dispatch(connect(getState().auth.url, getState().auth.token))
    }
}

export function fetchInfoPage(type, qprop) {
    console.log('loading', type, 'info page', qprop);
    return (dispatch, getState) => {
        return fetch(getState().auth.url + ':8001/oddschecker/info-pages/' + type + '/' + qprop.name, bbOpts(getState()))
            .then(response => response.json())
            .then(json => dispatch({type: types.INFO_PAGE, page: type, qprop: qprop, data: json}));
    }
}

export function fetchBetInfoPage(messageOrBetId) {
    console.log('loading bet info page', messageOrBetId);
    return (dispatch, getState) => {
        let q = 'bet-id=' + messageOrBetId;
        if (typeof(messageOrBetId) == 'object') {
            q = 'message-id=' + messageOrBetId.messageId;
        }
        return fetch(getState().auth.url + ':8001/oddschecker/info-pages/bet?' + q, bbOpts(getState()))
            .then(response => response.json())
            .then(json => dispatch({type: types.INFO_PAGE, page: 'bet', qprop: messageOrBetId, data: {options: json}}));
    }
}

export function fetchDateRangeInfoPage(info) {
    console.log('loading date-range info page', info);
    return (dispatch, getState) => {
        return fetch(getState().auth.url + ':8001/oddschecker/info-pages/date-range?date-start=' + info.dateStart + '&date-end=' + info.dateEnd, bbOpts(getState()))
            .then(response => response.json())
            .then(json => dispatch({type: types.INFO_PAGE, page: 'date-range', qprop: info, data: json}));
    }
}

export function loadInfoPage(type, info) {
    console.log('loadInfoPage', type, info);
    switch (type) {
        case 'player':
        case 'team':
            return fetchInfoPage(type, info);
        case 'date':
            return fetchInfoPage(type, info);
        case 'date-range':
            return fetchDateRangeInfoPage(info);
        case 'bet':
            return fetchBetInfoPage(info);
        default:
            console.log('unknown info page type', type);
            return {type: 'ignoring'};

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
    return (dispatch) => {
        dispatch({type: types.SAVE_TOKEN, data: json});
        dispatch(loadToken());
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

export function handleRoomHistory(history) {
    return {
        type: types.UPDATE_ROOM_HISTORY, roomId: history.roomId, messages: history.messages
    }
}

export function loadSelectedRoom() {
    return (dispatch, getState) => {
        return fetch(getState().auth.url + ':8001/rooms/' + getState().rooms.selected + "/history?limit=30&olderThan=" + new Date().toISOString(), bbOpts(getState()))
            .then(response => response.json())
            .then(json => dispatch(handleRoomHistory(json)));
    }
}

export function fetchRoomsFromServer() {
    return (dispatch, getState) => {
        if (!getState().auth.needsLogin) {
            return fetch(getState().auth.url + ':8001/rooms', bbOpts(getState()))
                .then(response => response.json())
                .then(json => dispatch(refreshRoomsList(json)))
                .then(() => dispatch(loadSelectedRoom()));
        } else {
            console.log("not fetching, login is disabled")
        }
    }
}