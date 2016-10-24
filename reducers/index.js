import {combineReducers} from "redux";
import * as types from "../constants/ActionTypes";
// import {DefaultAlgoSize} from "../constants/defaults";
import {merge} from "../commons/index"

const MESSAGES_COUNT = 20;

export var serverUrl = "http://dev-root-betblocks-01.gp-cloud.com";
if (window.location.href.startsWith("http://localhost")) {
    serverUrl = "http://192.168.33.6"
}

function getEnv(url) {
    switch (url) {
        case 'http://dev-root-betblocks-01.gp-cloud.com':
            return 'dev';
        case 'http://prod-root-betblocks-01.gp-cloud.com':
            return 'prod';
        default:
            return 'local';
    }
}


function auth(state = {needsLogin: false, url: serverUrl, env: getEnv(serverUrl)}, action) {
    switch (action.type) {
        case types.CHANGE_URL:
            return {url: action.newUrl, env: getEnv(action.newUrl)};
        case types.LOAD_TOKEN:
            var token = localStorage.getItem('token-' + state.env);
            if (token != null) {
                return merge(state, {token: token, needsLogin: false})
            } else {
                return merge(state, {needsLogin: true, token: null})
            }
        case types.SAVE_TOKEN:
            localStorage.setItem('token-' + state.env, action.data.token);
            return merge(state, {token: action.data.token, needsLogin: false});
        default:
            return state
    }
}

function rooms(state = {available: [], selected: null, history: []}, action) {
    switch (action.type) {
        case types.REFRESH_ROOMS_LIST:
            if (action.data.rooms.length != 'undefined' && action.data.rooms.length > 0) {
                return {
                    available: action.data.rooms,
                    selected: state.selected || action.data.rooms[0].id,
                    selectedRoom: action.data.rooms[0],
                    history: [],
                }
            } else {
                return {available: [], selected: null}
            }
        case types.SELECT_ROOM:
            return merge(state, {
                selected: action.id,
                selectedRoom: state.available.find(x => x.id == action.id),
                history: []
            });
        case types.UPDATE_ROOM_HISTORY:
            if (action.roomId != state.selected) {
                console.log("History of not selected room!, ignoring");
                return state;
            } else {
                let all = state.history.concat(action.messages);
                let result = all.sort((x, y) => {
                    return new Date(y.date) - new Date(x.date)
                }).slice(0, MESSAGES_COUNT).reverse();
                return merge(state, {history: result})
            }
        default:
            return state
    }
}

function infoPage(state = {type: null, data: null, qprop: null}, action) {
    switch (action.type) {
        case types.INFO_PAGE:
            return {type: action.page, data: action.data, qprop: action.qprop};
        default:
            return state
    }
}


// function serverState(state = {available: [], selected: null}, action) {
//     switch (action.type) {
//         case types.SELECT_CPU:
//             return merge(state, {selected: action.id});
//         case types.REFRESH_CPU_LIST:
//             if (action.data.length !== 'undefined' && action.data.length > 0) {
//                 return {
//                     available: action.data,
//                     selected: action.data[0].id
//                 }
//             } else {
//                 return {available: [], selected: null}
//             }
//         case types.HANDLE_NEW_CPU:
//             return {
//                 available: [
//                     ...state.available,
//                     action.data
//                 ],
//                 selected: action.data.id
//             };
//         default:
//             return state
//     }
// }
//
// export function checkIfIsControlledStep(gates, position = null) {
//     if (position == undefined || position == null) {
//         return gates.filter(x => x.gate.type == 'C').length > 0;
//     }
//     return gatesAtPosition(gates, position).filter(x => x.gate.type == 'C').length > 0;
// }
// const SpecialGates = ['C', 'Cross'];
//
// export function gatesAtPosition(gates, position) {
//     return gates.filter(x => x.position == position);
// }
// export function findNormalGatesHere(gates, position = null) {
//     if (position != undefined && position != null) {
//         gates = gatesAtPosition(gates, position)
//     }
//     return gates.filter(x =>SpecialGates.indexOf(x.gate.type) < 0)
// }
// export function findControlledGatesHere(gates, position = null) {
//     if (position != undefined && position != null) {
//         gates = gatesAtPosition(gates, position)
//     }
//     return gates.filter(x =>x.gate.type == 'C')
// }
// function findGatesHere(gateType, position, gates) {
//     var onThisPosition = gates.filter(x => x.position == position);
//     return onThisPosition.find(x =>gateType == x.gate.type);
// }
//
// function countNormalGates(gates, position) {
//     return findNormalGatesHere(gates, position).length
// }
// function gateAt(position, qbit, gates) {
//     return gates.find(x => x.position == position && x.qbit == qbit)
// }
// function addDirectionsTo(gate, toUp, toDown) {
//     return Object.assign({}, gate, {
//         gate: Object.assign({}, gate.gate, {isToUp: toUp, isToDown: toDown})
//     });
// }
// function upperizeGate(gate) {
//     return addDirectionsTo(gate, true, false)
// }
// function downizeGate(gate) {
//     return addDirectionsTo(gate, false, true)
// }
// function betwenizeGate(gate) {
//     return addDirectionsTo(gate, true, true)
// }
// function disableDirection(gate) {
//     return addDirectionsTo(gate, false, false)
// }
//
// function algorithms(state = {}, action) {
//     switch (action.type) {
//         case types.ADD_GATE_TO_ALG:
//             let obj = Object.assign({});
//             var thisStateGates = state[action.cpuId] || [];
//             switch (action.gate.type) {
//                 case 'C':
//                     const normalGates = findNormalGatesHere(thisStateGates, action.position);
//                     const normalGatesCnt = normalGates.length;
//                     console.log("normal gates are", JSON.stringify(normalGates));
//                     if (normalGatesCnt < 1) {
//                         missing target gate for control
// return state
// } else if (normalGatesCnt > 1) {
// console.log("too much target gates");
// return state
// } else if (normalGates[0].qbit == action.qbit) {
//     console.log("overriding is disabled");
//     return state
// } else {
//     var newGates = [];
//     var localGates = gatesAtPosition(thisStateGates, action.position).filter(x => x.gate.type != "Cross");
//     localGates.push({
//         position: action.position,
//         qbit: action.qbit,
//         gate: {
//             type: 'C'
//         }
//     });
//
//     var localGatesQbits = localGates.map(x => x.qbit);
//     const minQ = Math.min.apply(Math, localGatesQbits);
//     const maxQ = Math.max.apply(Math, localGatesQbits);
//     for (var i = minQ + 1; i < maxQ; ++i) {
//         const thisGate = gateAt(action.position, i, localGates);
//         if (thisGate == undefined) {
//             newGates.push({
//                 qbit: i,
//                 position: action.position,
//                 gate: {
//                     type: 'Cross'
//                 }
//             })
//         } else if (thisGate.gate.type == "Cross") {
//             newGates.push(thisGate)
//         } else {
//             newGates.push(betwenizeGate(thisGate))
//         }
//     }
//     var gateToUpp = gateAt(action.position, minQ, localGates);
//     newGates.push(upperizeGate(gateToUpp));
//     var gateToDown = gateAt(action.position, maxQ, localGates);
//     newGates.push(downizeGate(gateToDown));
//     obj[action.cpuId] = [
//         ...newGates,
//         ...((thisStateGates).filter(g =>
//             g.position !== action.position
//         ))
//     ];
//     return Object.assign({}, state, obj);
// }
// case 'N':
//     if (!checkIfIsControlledStep(thisStateGates, action.position)) {
//         obj[action.cpuId] = [
//             ...((thisStateGates).filter((g) =>
//                 g.position !== action.position || g.qbit != action.qbit
//             ))
//         ];
//         return Object.assign({}, state, obj);
//     } else {
//         var newGates = [];
//         var gatesToFilter = gatesAtPosition(thisStateGates, action.position);
//         for (var i = 0; i < gatesToFilter.length; ++i) {
//             var g = gatesToFilter[i];
//             if (SpecialGates.indexOf(g.gate.type) < 0) {
//                 console.log(g.gate.qbit, action.qbit, g.gate.qbit != action.qbit)
//                 if (g.qbit != action.qbit) {
//                     newGates.push(disableDirection(g))
//                 }
//             }
//         }
//         obj[action.cpuId] = [
//             ...newGates,
//             ...(thisStateGates).filter(r => r.position !== action.position)
//         ];
//         return Object.assign({}, state, obj);
//
//     }
// default:
//     if (!checkIfIsControlledStep(thisStateGates, action.position)) {
// obj[action.cpuId] = [
//     {
//         position: action.position,
//         gate: action.gate,
//         qbit: action.qbit
//     },
//     ...((thisStateGates).filter((g) =>
//         g.position !== action.position || g.qbit != action.qbit
//     ))
// ];
// return Object.assign({}, state, obj);
// } else {
//     console.log("cannot drag normal gate when there is controlled step")
//     return state;
// }
// }
// case types.REFRESH_CPU_LIST:
//     var r = Object.assign({});
//     action.data.map((stillExist) => {
//         r[stillExist.id] = state[stillExist.id]
//     });
//     return r;
// default:
//     return state;
// }
// }
//
// function execution(state = {}, action) {
//     var update = {};
//     var actualState = state[action.cpuId] || {position: 0, length: DefaultAlgoSize};
//     switch (action.type) {
//         case types.ENSURE_ALGORITHM_LENGTH:
//             update[action.cpuId] = Object.assign({}, actualState, {length: Math.max(1, action.than + 2, actualState.length)});
//             return Object.assign({}, state, update);
//         case types.MODIFY_ALGORITHM_LENGTH:
//             update[action.cpuId] = Object.assign({}, actualState, {length: Math.max(1, actualState.length + action.delta)});
//             return Object.assign({}, state, update);
//         case types.RESET:
//             update[action.cpuId] = Object.assign({}, actualState, {position: 0});
//             return Object.assign({}, state, update);
//         case types.MOVE:
//             var newPos = Math.max(Math.min(actualState.position + action.delta, actualState.length - 1), 0);
//             update[action.cpuId] = Object.assign({}, actualState, {position: newPos});
//             return Object.assign({}, state, update);
//         case types.REFRESH_CPU_LIST:
//             var r = Object.assign({});
//             action.data.map((stillExist) => {
//                 r[stillExist.id] = state[stillExist.id]
//             });
//             return r;
//         default:
//             return state;
//     }
// }
//
// function cpuState(state = {}, action) {
//     switch (action.type) {
//         case types.HANDLE_CPU:
//             return action.data;
//         default:
//             return state
//     }
// }
//
const rootReducer = combineReducers({auth, rooms, infoPage,});

export default rootReducer
