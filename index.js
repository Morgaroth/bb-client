import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import * as actions from "./actions/index"
var bs = require('bootstrap');
const store = configureStore();

// place for initialize application
store.dispatch(actions.loadToken());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);