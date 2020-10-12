import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import Home from './Components/Home/wrapper';
import Dashboard from "./Components/Dashboard/wrapper";
import SignIn from './Components/Signin/SignIn'
import CreateAccount1 from './Components/CreateAccount/p1';
import CreateAccount2 from './Components/CreateAccount/p2';
import CreateAccount3 from './Components/CreateAccount/p3';
import ProtectedRoute from 'module'

ReactDOM.render((
  <BrowserRouter>
  <Switch>
    <Route exact={true} path='/' component={Home} />
    <Route exact={true} path='/signin' component={SignIn} />
    <Route exact={true} path='/createaccount1' component={CreateAccount1} />
    <Route exact={true} path='/createaccount2' component={CreateAccount2} />
    <Route exact={true} path='/createaccount3' component={CreateAccount3} />
    <ProtectedRoute path='/' exact={true} component={Dashboard} />
    <ProtectedRoute component={Dashboard} /> 
  </Switch>
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
