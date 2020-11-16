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
import {connect} from 'react-redux'

function App(props) {

    React.useEffect(() => {
        console.log('call gayi');
        console.log(props.authDone);
        if(localStorage.getItem('token')) {
          props.setAuth(true);
        }
      },[props.authDone])

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
    <ProtectedRoute1 path='/dashboard' exact={true} component={Dashboard} />
    <ProtectedRoute1 component={Dashboard} />
  </Switch>
  </BrowserRouter>
  
    )
}

const mapStateToProps = state => {
    return {
      authDone: state.userDetails.authDone
    }
  }

const mapDispatchToProps = dispatch => {
    return {
      setAuth: data => {
        dispatch({
          type: 'SET_AUTH',
          authDone: data
        })
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App)