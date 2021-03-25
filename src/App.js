import React, {useEffect, useState} from 'react'
import './App.css';
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
import ForgotPassword from './Components/forgotpassword/forgotpassword'
import Brand from './Components/Brand/Brand'
import Process from './Components/Brand/Process'
import UnsubcribedEmail from './Components/UnsubscribedEmail/UnsubcribedEmail'
import {connect} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from "./Config/config.json"
import TermsConditions from './Components/Terms&Conditions/Terms&Conditions';
import Privacy_Policy from './Components/Terms&Conditions/PrivacyPolicy'
import Campaign from './Components/Campaign/Campaign'
import Admin from './Components/Admin'

function App(props) {

const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    axios({
      url:BASE_URL,
      method:"GET"
    }).then(res=>{
      setIsSplash(!res.data.message)
    })
  })

    return !isSplash ? (
      !props.authDone ? (
        <BrowserRouter>
        <Switch>
        <Route exact={true} path="/unsubscribeEmail/:email" component={UnsubcribedEmail}/>
          <Route exact={true} path='/signin' component={SignIn} />
          <Route exact={true} path='/createaccount1' component={CreateAccount1} />
          <Route exact={true} path='/createaccount2' component={CreateAccount2} />
          <Route exact={true} path='/createaccount3' component={CreateAccount3} />
          <Route exact={true} path='/createaccount4' component={CreateAccount4} />
          <Route exact={true} path='/createaccount5' component={CreateAccount5} />
          <Route exact={true} path='/createaccountfinal' component={CreateAccountFinal} />
          <Route exact={true} path="/forgotpassword" component={ForgotPassword}/>
          <Route exact={true} path="/brandregister" component={Brand}/>
          <Route exact={true} path="/brandprocess" component={Process}/>
          <Route exact={true} path="/termsandconditions" component={TermsConditions}/>
          <Route exact={true} path="/privacypolicy" component={Privacy_Policy}/>
          <Route exact={true} path="/admin" component={Admin}/>
          <Route path='/' component={Home} />
        </Switch>
        </BrowserRouter>
          ) : (
            <BrowserRouter>
        <Switch>

          <Route exact={true} path="/termsandconditions" component={TermsConditions}/>
          <Route exact={true} path="/privacypolicy" component={Privacy_Policy}/>
          <Route path="/campaign/:campaignID" component={Campaign}/>
          <ProtectedRoute1 component={Dashboard} />
        </Switch>
        </BrowserRouter>
          )
    ) : (
      <div className='splashparent' >
      <img className='splash' src={require('./splash1.gif').default} style={{width:"90%"}}/>
      </div>
    )
}

const mapStateToProps = state => {
  return {
    authDone: state.userDetails.authDone
  }
}

export default connect(mapStateToProps, undefined)(App)
