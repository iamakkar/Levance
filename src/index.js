import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from './App'
import {Provider} from 'react-redux'
import rootReducer from './Components/Reducers/combinedReducer'
import {createStore} from 'redux';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token')
if (token) {
  store.dispatch({type: 'SET_AUTH', authDone: true})
}

ReactDOM.render((
  <Provider store={store} >
  <App />
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
