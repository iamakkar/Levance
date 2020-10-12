import React, { useState } from "react";
import "./SignIn.css";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import Eye from "@material-ui/icons/VisibilitySharp";
import Eyecut from "@material-ui/icons/VisibilityOffSharp";
import {Link} from 'react-router-dom'

const validate = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);

function App() {
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
    setValid(validate.test(cred.email));
    console.log(cred);
    console.log(valid);
  }

  return (
    <div className="App">
      <div className="wrappersignin">
        <h1>Sign In</h1>
        <div className={valid || cred.email === "" ? "con-input" : "invalid"}>
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
        <div className="con-input">
          <input
            className="input2"
            placeholder="Password"
            type={!visible ? "password" : "text"}
            onChange={(val) => setCred({ ...cred, password: val })}
          />
          <i className="icon">
            <Lock />
          </i>
          <i onClick={() => PasswordShow()}>
            {!visible ? <Eyecut /> : <Eye />}
          </i>
          <div className="bg"></div>
        </div>
        <button className="btn">Log In</button>
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
  );
}

export default App;
