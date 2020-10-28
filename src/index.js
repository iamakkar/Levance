import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import Home from './Components/Home/wrapper';
import Dashboard from "./Components/Dashboard/wrapper";
import SignIn from './Components/Signin/SignIn'
import CreateAccount1 from './Components/CreateAccount/p1';
import CreateAccount2 from './Components/CreateAccount/p2';
import CreateAccount3 from './Components/CreateAccount/p3';
import CreateAccount4 from './Components/CreateAccount/p4';
import CreateAccount5 from './Components/CreateAccount/p5';
import CreateAccountFinal from './Components/CreateAccount/final';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import rootReducer from './Components/Reducers/combinedReducer'

const store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store} >
  <BrowserRouter>
  <Switch>
    <Route exact={true} path='/' component={Home} />
    <Route exact={true} path='/signin' component={SignIn} />
    <Route exact={true} path='/createaccount1' component={CreateAccount1} />
    <Route exact={true} path='/createaccount2' component={CreateAccount2} />
    <Route exact={true} path='/createaccount3' component={CreateAccount3} />
    <Route exact={true} path='/createaccount4' component={CreateAccount4} />
    <Route exact={true} path='/createaccount5' component={CreateAccount5} />
    <Route exact={true} path='/createaccountfinal' component={CreateAccountFinal} />
    <ProtectedRoute path='/dash' exact={true} component={Dashboard} />
    <ProtectedRoute component={Dashboard} /> 
  </Switch>
  </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
