import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "./app/containers/App";
import configureStore from "./app/store/configureStore";
import * as actions from "./app/actions";
const store = configureStore();

// place for initialize application
store.dispatch(actions.loadToken());

Array.prototype.flatMap = function (lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
};

String.prototype.htmlEscaped = function () {
  let tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return this.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
};
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);