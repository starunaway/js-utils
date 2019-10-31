import React from 'react';
import ReactDOM from 'react-dom';
import * as Routers from 'react-router-dom';
import {Provider} from 'react-redux';
import invariant from 'invariant';
import {createHashHistory} from 'history';
import {isFunction, isHTMLElement, isString} from '../utils';
import create from '..redux/core';

function App(opts = {}) {
  const {onEffect, onFetchOption, onReducer} = opts;
  const history = opts.history || createHashHistory();
  const createOpts = {
    setupApp: (app) => {
      app._history = patchHistory(history);
    },
    onEffect,
    onFetchOption,
    onReducer,
    history
  };

  const app = create(createOpts);
  const oldAppStart = app.start;
  app.router = router;
  app.start = start;

  return app;

  function router(router) {
    invariant(isFunction(router), `[app.router] router should be function`);
    app._router = router;
  }

  function start(container) {
    if (isString(container)) {
      container = document.querySelector(container);
      invariant(container, '[app.start] container 未找到');
    }
    invariant(!container || isHTMLElement(container), '[app.start] container 不是 HTMLElement');

    invariant(app._router, `[app.router] router must be registered before app.start()`);

    if (!app._store) {
      oldAppStart(app);
    }

    const store = app._store;
    if (container) {
      render(container, store, app);
    } else {
      getProvider(store, this);
    }
  }
}

function render(container, store, app) {
  ReactDOM.render(getProvider(store, app), container);
}

function getProvider(store, app) {
  return <Provider store={store}>{app._router(app, Routers)}</Provider>;
}

function patchHistory(history) {
  const oldListen = history.listen;
  history.listen = (callback) => {
    callback(history.location);
    return oldListen.call(history, callback);
  };
  return history;
}

export default App;
