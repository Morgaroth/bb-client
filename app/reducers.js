import {combineReducers} from "redux";
import * as types from "./constants";
import {MESSAGES_LIST_SIZE} from "./constants";
import {merge} from "./commons";

export let serverUrl = "http://dev-server.getbetblocks.com";
if (window.location.href.startsWith("http://192.168.33.6")) {
  serverUrl = "http://192.168.33.6";
} else if (window.location.href.startsWith("http://prod-root-betblocks")) {
  serverUrl = "http://prod-root-betblocks-01.gp-cloud.com";
} else if (window.location.href.startsWith("http://dev-root-betblocks")) {
  serverUrl = "http://dev-server.getbetblocks.com";
} else {
  serverUrl = window.location.href;
  if (serverUrl.endsWith('/') || serverUrl.endsWith('/') || serverUrl.endsWith('/')) {
    serverUrl = serverUrl.slice(0, -1)
  }
  if (serverUrl.endsWith(':8008') || serverUrl.endsWith(':8080') || serverUrl.endsWith(':5000')) {
    serverUrl = serverUrl.slice(0, -5)
  }
}

function getEnv(url) {
  switch (url) {
    case 'http://dev-server.getbetblocks.com':
      return 'dev';
    case 'http://stg-root-betblocks-01.gp-cloud.com':
      return 'stg';
    case 'http://localhost':
      return 'local';
    case 'http://192.168.33.6':
      return 'vagrant';
    default:
      let result = url;
      if (result.startsWith('http://')) {
        result = result.slice(8)
      }
      if (result.endsWith('/') || result.endsWith('/') || result.endsWith('/')) {
        result = result.slice(0, -1)
      }
      if (result.endsWith(':8008') || result.endsWith(':8080') || result.endsWith(':5000')) {
        result = result.slice(0, -5)
      }
      return result
  }
}


function auth(state = {needsLogin: false, url: serverUrl, env: getEnv(serverUrl)}, action) {
  switch (action.type) {
    case types.CHANGE_URL:
      return {url: action.newUrl, env: getEnv(action.newUrl)};
    case types.LOAD_TOKEN:
      let token = localStorage.getItem('token-' + state.env);
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
        }).slice(0, MESSAGES_LIST_SIZE).reverse();
        return merge(state, {history: result})
      }
    default:
      return state
  }
}

function infoPage(state = {type: null, data: null, qprop: null}, action) {
  switch (action.type) {
    case types.LOADING_INFO_PAGE:
      return merge(state, {type: action.page, status: 'fetching', qprop: action.qprop || state.qprop});
    case types.INFO_PAGE:
      return {type: action.page, status: 'OK', data: action.data, qprop: action.qprop, additional: action.additional};
    case types.INFO_PAGE_NOT_FOUND:
      return {type: action.page, status: 'NOT_FOUND', qprop: action.qprop};
    case types.LOAD_LIVE_PROMPT_WINDOW:
      return {type: 'live-prompt', data: null, qprop: null};
    case types.BET_SEARCH_WINDOW:
      return {type: 'bet-search', data: null};
    case types.LOADING_PROP_SUGGESTIONS:
      return merge(state, {type: 'live-prompt', status: 'loading'});
    case types.LOADING_BETS_SEARCH:
      return merge(state, {type: 'bet-search', status: 'loading'});
    case types.LOADED_PROP_SUGGESTIONS:
      return merge(state, {
        type: 'live-prompt',
        suggestions: action.data.suggestions,
        text: action.data.rawText,
        data: action.data,
        status: 'OK'
      });
    case types.LOADED_BETS_SEARCH:
      if (action.ctr > (state.ctr || -1)) {
        return merge(state, {
          type: 'bet-search',
          bets: action.data.bets,
          text: action.data.bets,
          data: action.data,
          ctr: action.ctr,
          status: 'OK'
        });
      } else return state;
    case types.LOADING_SERVER_HEALTH:
      return merge(state, {type: 'server-health', data: {health: []}, status: 'fetching'});
    case types.LOAD_ROOMS_MANAGEMENT_WINDOW:
      return merge(state, {type: 'rooms-management', data: {}, status: 'OK'});
    case types.LOAD_BET_BROWSER_WINDOW:
      return merge(state, {type: 'bet-browser', data: {}, status: 'Ready'});
    case types.LOADING_BET_BROWSER:
      return merge(state, {type: 'bet-browser', status: 'fetching'});
    case types.LOADED_BET_BROWSER:
      return merge(state, {type: 'bet-browser', data: action.data, status: 'OK'});
    case types.LOADED_SERVER_HEALTH:
      return merge(state, {type: 'server-health', data: action.data, status: 'OK'});
    case types.SHOW_INFO_DATA_PANEL:
      return merge(state, {type: 'database-actions', data: 'no actions yet', status: 'OK'});
    case types.LOADING_INFO_DATA_ACTION:
      return merge(state, {type: 'database-actions', data: '', status: 'waiting'});
    case types.LOADED_INFO_DATA_ACTION:
      return merge(state, {type: 'database-actions', data: action.data, status: 'OK'});
    case types.LOADING_SHORTCUTS:
      return merge(state, {type: 'shortcuts', data: {}, status: 'waiting'});
    case types.LOADED_SHORTCUTS:
      return merge(state, {type: 'shortcuts', data: action.data, status: 'OK'});
    case types.MATRIX:
      if (action.data == undefined) {
        return merge(state, {type: 'matrix', data: {health: []}, status: 'OK'});
      } else {
        let a = JSON.parse(JSON.stringify(state.data.health));
        a.push(action.data);
        return merge(state, {type: 'matrix', data: {health: a}, status: 'OK'});
      }
    default:
      return state
  }
}

function appState(state = {enabled: false}, action) {
  switch (action.type) {
    case types.TOGGLE_APP_STATE:
      return {enabled: !state.enabled};
    default:
      return state
  }
}


const rootReducer = combineReducers({auth, rooms, infoPage, appState,});

export default rootReducer
