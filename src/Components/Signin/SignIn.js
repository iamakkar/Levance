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
import Swal from 'sweetalert2';
import {BASE_URL} from "../../Config/config.json"

const validate = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);

function App(props) {

  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [cred, setCred] = useState({ email: "", password: "" });
  const [valid, setValid] = useState(true);
  const [loader,setLoader] = useState(false);
  function PasswordShow() {
    if (!visible) setVisible(true);
    else {
      setVisible(false);
    }
  }

  function ValidateEmail(e) {
    setCred({
      ...cred,
      email: e.target.value.trim(),
    });
    // setValid(validate.test(e.target.value));
    setValid(true)
  }

  async function submit() {
    if(!cred.email||!cred.password)
    return Swal.fire({
      title: 'Missing Details',
      text: 'Please fill all details.',
      icon: 'warning',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Okay',
    })
    setLoader(true)

    await axios.post(BASE_URL+'/login', cred)
    .then(res => next(res))
    .catch((e) => {console.log(e);setLoader(false)})
  }

  async function next(x) {
    setLoader(false)
    
    if(x.data.Error)
    {
     return M.toast({html:x.data.Error})
    }
      else{
        await localStorage.setItem('token', x.data.token);
        // await localStorage.setItem('user',JSON.stringify(x.data.user));
        props.setEmail(x.data.user.email)
        props.setAuth(true);
        history.push("/dashboard")
      }
  }

  return (<>
  <Navbar/>
    <div className="AppSignin">
      <div className="row" >
        <div className="col s12 m12">
      <div className="wrappersignin">
        <h1>Sign In</h1>
        <div className={valid || cred.email === "" ? "con-inputSignin" : "invalidSignin"}>
          <input
            name="email"
            placeholder="Email or Username"
            type="email"
            id="email"
            formNoValidate
            onChange={ValidateEmail}
            onKeyPress={(e)=>{if(e.key=="Enter")document.getElementById("password").focus()}}
          />
          <i className="icon">
            <Email />
          </i>
          <div className="bg"></div>
        </div>
        <div className="con-inputSignin">
          <input
            placeholder="Password"
            id="password"
            type={!visible ? "password" : "text"}
            onChange={(val) => setCred({ ...cred, password: val.target.value })}
            onKeyPress={(e)=>{if(e.key=="Enter"){document.getElementById("submit").click();document.getElementById("password").blur()}}}
          />
          <i className="icon">
            <Lock />
          </i>
          <i onClick={() => PasswordShow()}>
            {!visible ? <Eyecut /> : <Eye />}
          </i>
          <div className="bg"></div>
        </div>

        {loader&&<div class="preloader-wrapper small active" style={{marginTop:"10px"}}>
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>}
        <br/>
        <button className="buttn" id="submit" onClick={submit} >Log In</button>
        <br/>
        <span>or</span>
        <div className="afteror">
          <a className="new">
            <Link to={'/createaccount1'} className='new' >Create an account</Link>
          </a>
          <div className="seperator"></div>
          <Link to="/forgotpassword" className="new">
            Forgot password?
          </Link>
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
