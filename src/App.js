import React from 'react'
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
import ProtectedRoute1 from './Components/ProtectedRoute/ProtectedRoute1'
import privacy from "./Components/PrivacyPolicy/privacypolicy"
import Terms from "./Components/terms_and_conditions/terms"
export default function App() {

    return (
        
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
    <Route exact={true} path="/privacypolicy" component={privacy}/>
    <Route exact={true} path="/termsandconditions" component={Terms}/>
    <ProtectedRoute1 path='/dashboard' exact={true} component={Dashboard} />
    <ProtectedRoute1 component={Dashboard} />
  </Switch>
  </BrowserRouter>
  
    )
}

