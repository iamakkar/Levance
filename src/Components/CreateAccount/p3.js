import React, { useState } from "react";
import "./p3.css";
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Lock from "@material-ui/icons/Lock";
import Eye from "@material-ui/icons/VisibilitySharp";
import Eyecut from "@material-ui/icons/VisibilityOffSharp";
import {Link} from 'react-router-dom'

function App() {
  const [visible, setVisible] = useState(false);

//   const history = useHistory();

  function PasswordShow() {
    if (!visible) setVisible(true);
    else {
      setVisible(false);
    }
  }

  return (
    <div className="App">
      <div className="wrappercreactaccount3">
        <h1>Sign Up</h1>
        <div className="con-input">
          <input placeholder="Pick Username" type="text" />
          <i className="icon">
            <PersonPinIcon />
          </i>
          <div className="bg"></div>
        </div>
        <div className="con-input">
          <input placeholder="Password" type={!visible ? "password" : "text"} />
          <i className="icon">
            <Lock />
          </i>
          <div className="bg"></div>
        </div>
        <div className="con-input">
          <input placeholder="Confirm Password" type={!visible ? "password" : "text"} />
          <i className="icon">
            <Lock />
          </i>
          <i onClick={() => PasswordShow()}>
            {!visible ? <Eyecut /> : <Eye />}
          </i>
          <div className="bg"></div>
        </div>
        <button className="btn">Next</button>
        <span>or</span>
        <div className="afteror">
          <Link  className="new" to={'/signin'} >
            Already have an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
