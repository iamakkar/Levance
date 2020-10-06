import React, { Component } from "react";
import "./App.css";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <h1>Sign In</h1>
          <div className="con-input">
            <input placeholder="Email" type="text" />
            <i className="icon">
              <Email />
            </i>
            <div className="bg"></div>
          </div>
          <div className="con-input">
            <input placeholder="Password" type="text" />
            <i className="icon">
              <Lock />
            </i>
            <div className="bg"></div>
          </div>
          <button className="btn">Log In</button>
          <span>or</span>
          <div className="afteror">
            <a href="https://hacktoberfest.digitalocean.com" className="new">
              Create an account
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
}

export default App;
