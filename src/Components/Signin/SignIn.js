import React, { useState } from "react";
import "./SignIn.css";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import Eye from "@material-ui/icons/VisibilitySharp";
import Eyecut from "@material-ui/icons/VisibilityOffSharp";
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';
import Logo from '../../logo/Levance.svg'
import Navbar from '../Home/navbar'
import M from "materialize-css"
import {BASE_URL} from "../../Config/config.json"

const validate = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);

function App(props) {

  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [cred, setCred] = useState({ email: "", password: "" });
  const [valid, setValid] = useState(true);

  function PasswordShow() {
    if (!visible) setVisible(true);
    else {
      setVisible(false);
    }
  }

  function ValidateEmail(e) {
    setCred({
      ...cred,
      email: e.target.value,
    });
    setValid(validate.test(e.target.value));
  }

  async function submit() {
    props.setEmail(cred.email)
    await axios.post(BASE_URL+'/login', cred)
    .then(res => next(res))
    .catch((e) => console.log(e))
  }

  async function next(x) {
    console.log(x)
    if(x.data.Error)
    {
      M.toast({html:x.data.Error})
    }
      else{
        await localStorage.setItem('token', x.data.token);
        // await localStorage.setItem('user',JSON.stringify(x.data.user));
        
        props.setAuth(true);
        window.location.href='/dashboard';
      }
  }

  return (<>
  <Navbar/>
    <div className="AppSignin container-fluid">
      <div className="row" style={{marginBottom:'0px'}}>
        <div className="col s12 m7  center-align">
        <img src={require("../Home/influencer.png")} className="influencer_brand_logo_signin" alt={"Error-404"} />
            </div>
        <div className="col s12 m5">
      <div className="wrappersignin">
        <h1>Sign In</h1>
        <div className={valid || cred.email === "" ? "con-inputSignin" : "invalidSignin"}>
          <input
            name="email"
            placeholder="Email"
            type="email"
            formNoValidate
            onChange={ValidateEmail}
          />
          <i className="icon">
            <Email />
          </i>
          <div className="bg"></div>
        </div>
        <div className="con-inputSignin">
          <input
            placeholder="Password"
            type={!visible ? "password" : "text"}
            onChange={(val) => setCred({ ...cred, password: val.target.value })}
          />
          <i className="icon">
            <Lock />
          </i>
          <i onClick={() => PasswordShow()}>
            {!visible ? <Eyecut /> : <Eye />}
          </i>
          <div className="bg"></div>
        </div>
        <button className="buttn" onClick={submit} >Log In</button>
        <br/>
        <span>or</span>
        <div className="afteror">
          <a href="https://hacktoberfest.digitalocean.com" className="new">
            <Link to={'/createaccount1'} className='new' >Create an account</Link>
          </a>
          <div className="seperator"></div>
          <a href="https://hacktoberfest.digitalocean.com" className="new">
            Forgot password?
          </a>
        </div>
      </div>
      </div>
      </div>
    </div>
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setAuth: data => {
      dispatch({
        type: 'SET_AUTH',
       authDone: data,
      })
    },
    setEmail: data => {
      dispatch({
        type: 'SET_EMAIL',
       email: data,
      })
    },
   
  }
}

export default connect(undefined, mapDispatchToProps)(App);
