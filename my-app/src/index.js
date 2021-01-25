import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { QueryParamProvider } from 'use-query-params';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers'

import 'antd/dist/antd.css';


const store = createStore(rootReducer,composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>

    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
