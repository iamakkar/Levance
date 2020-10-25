import React, {useState} from "react";
import "./p1.css";
import Person from '@material-ui/icons/PersonPin';
import Lock from "@material-ui/icons/Lock";
import Eye from "@material-ui/icons/VisibilitySharp";
import Eyecut from "@material-ui/icons/VisibilityOffSharp";
import {Link, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';

function App(props) {

const history = useHistory();

const [visible, setVisible] = useState(false);
const [cvisible, setCVisible] = useState(false);
const [checked, setChecked] = useState(true);

function PasswordShow() {
    setVisible(!visible)
  }

  function ConfirmPasswordShow() {
    setCVisible(!cvisible)
  }

  function passwordCheck(e) {
    if (e.target.value === props.password ) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    console.log(props.password)    
    console.log(checked)    
  }

const Next = () => {
  history.push('/createaccount4')
}

  return (
    <div className="app">
      <div className="wrappercreateaccount1">
        <h1>Sign Up</h1>
        
        <div className="con-inputcreateaccount1">
         <input placeholder="Pick username" type="text" onBlur={val => props.setUsername(val.target.value)} />
         <i className="icon">
            <Person />
          </i>
          <div className="bg"></div>
        </div>
        
        <div className="con-inputcreateaccount1">
         <input placeholder="Password"  type={!visible ? "password" : "text"} onBlur={val => props.setPassword(val.target.value)} />
         <i className="icon">
            <Lock />
          </i>
          <i onClick={() => PasswordShow()}>
            {!visible ? <Eyecut /> : <Eye />}
          </i>
          <div className="bg"></div>
        </div>
        
        <div className={checked ? "con-inputcreateaccount1" : 'invalid'}>
        <input placeholder="Confirm Password"  type={!cvisible ? "password" : "text"} onChange={(val) => passwordCheck(val)} />
        <i className="icon">
            <Lock />
          </i>
          <i onClick={() => ConfirmPasswordShow()}>
            {!cvisible ? <Eyecut /> : <Eye />}
          </i>
          <div className="bg"></div>
        </div>
        
        <button className="btn" onClick={Next} >Next</button>
        <span>or</span>
        <div className="afteror">
          
            <Link to={'/signin'} className="new">Already have an account</Link>
          
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    password: state.userDetails.password,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUsername: data => {
      dispatch({
        type: 'SET_USERNAME',
        username: data
      })
    },
    setPassword: data => {
      dispatch({
        type: 'SET_PASSWORD',
        password: data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);