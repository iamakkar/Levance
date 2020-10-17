import React, {useState} from "react";
import "./p1.css";
import Person from '@material-ui/icons/PersonPin';
import Lock from "@material-ui/icons/Lock";
import Eye from "@material-ui/icons/VisibilitySharp";
import Eyecut from "@material-ui/icons/VisibilityOffSharp";
import {Link, useHistory } from 'react-router-dom';

function App() {

const history = useHistory();

const [visible, setVisible] = useState(false);
const [cvisible, setCVisible] = useState(false);


function PasswordShow() {
    setVisible(!visible)
  }

  function ConfirmPasswordShow() {
    setCVisible(!cvisible)
  }

const Next = () => {
  history.push('/createaccount5')
}

  return (
    <div className="app">
      <div className="wrappercreateaccount1">
        <h1>Sign Up</h1>
        
        <div className="con-inputcreateaccount1">
         <input placeholder="Pick username" type="text" />
         <i className="icon">
            <Person />
          </i>
          <div className="bg"></div>
        </div>
        
        <div className="con-inputcreateaccount1">
         <input placeholder="Password"  type={!visible ? "password" : "text"} />
         <i className="icon">
            <Lock />
          </i>
          <i onClick={() => PasswordShow()}>
            {!visible ? <Eyecut /> : <Eye />}
          </i>
          <div className="bg"></div>
        </div>
        
        <div className="con-inputcreateaccount1">
        <input placeholder="Confirm Password"  type={!cvisible ? "password" : "text"} />
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
          
            <Link to={'/signin'} className="new" >Already have an account</Link>
          
        </div>
      </div>
    </div>
  );
}

export default App;