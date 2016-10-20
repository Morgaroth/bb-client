import * as types from "../constants/ActionTypes";
import fetch from "isomorphic-fetch";
// import {
// gatesAtPosition,
// findNormalGatesHere,
// checkIfIsControlledStep,
// findControlledGatesHere
// } from "../reducers/index";

export function loadToken() {
    return {
        type: types.LOAD_TOKEN
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
// var userLogin = {
//     headers: {'X-User-Id': getUserCookie()},
//     mode: 'cors'
// };
//
// export function createCPU(size) {
//     return {type: types.CREATE_CPU, size}
// }
//
// export function deleteCPU(id) {
//     return {type: types.DELETE_CPU, id}
// }
//
// export function selectCPU(id) {
//     return (dispatch) => {
//         dispatch({type: types.SELECT_CPU, id});
//         dispatch(fetchSelectedCPU())
//     }
// }
//
export function changeServiceURL(serviceURL) {
    return {type: types.CHANGE_URL, newUrl: serviceURL}
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

// export function refreshCPUList(json) {
//     return {
//         type: types.REFRESH_CPU_LIST, data: json
//     }
// }
//
// export function fetchSelectedCPU() {
//     return (dispatch, getState) => {
//         let state = getState();
//         if (state.serverState.selected != null) {
//             return fetch(state.serviceUrl + '/cpu/' + state.serverState.selected, userLogin)
//                 .then(response => response.json())
//                 .then(data => dispatch(handleCPUData(data)))
//         } else {
//             dispatch(handleCPUData({}))
//         }
//     }
// }
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
// export function fetchCPUsFromServer() {
//     return (dispatch, getState) => {
//         return fetch(getState().serviceUrl + '/cpu', userLogin).then(response => response.json())
//             .then(json => dispatch(refreshCPUList(json)))
//             .then(() => dispatch(fetchSelectedCPU()));
//     }
// }
//
// export function addGateToAlgo(gate, cpuId, qbit, position) {
//     return (dispatch) => {
//         if (typeof gate == 'string') gate = {type: gate};
//         dispatch({type: types.ADD_GATE_TO_ALG, gate: gate, cpuId: cpuId, qbit: qbit, position: position});
//         dispatch(ensureIsMore(cpuId, position))
//     }
// }
//
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
// export function moveNext(cpuId) {
//     return doMove(1, 0)(cpuId);
// }
//
// export function movePrev(cpuId) {
//     return doMove(-1, -1)(cpuId);
// }
//
// export function reset(cpuId) {
//     console.log("disabled teporarily");
// return {type: 'NOTYPE'}
// }
//
// export function addAlgoSize(cpuId) {
//     return {type: types.MODIFY_ALGORITHM_LENGTH, cpuId: cpuId, delta: 1}
// }
//
// export function subAlgoSize(cpuId) {
//     return {type: types.MODIFY_ALGORITHM_LENGTH, cpuId: cpuId, delta: -1}
// }
// export function ensureIsMore(cpuId, than) {
//     return {type: types.ENSURE_ALGORITHM_LENGTH, cpuId: cpuId, than: than}
// }
//
// export function deleteSelectedCPU() {
//     return (dispatch, getState) => {
//         return fetch(getState().serviceUrl + '/cpu/' + getState().serverState.selected, {
//             method: 'DELETE',
//             headers: {
//                 'X-User-Id': getUserCookie()
//             },
//             mode: 'cors'
//         }).then(() => dispatch(selectCPU(null)))
//             .then(() => dispatch(fetchCPUsFromServer()));
//
//     }
// }