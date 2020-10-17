import React from "react";
import "./p1.css";
import Instagram from '@material-ui/icons/Instagram';
import Youtube from "@material-ui/icons/YouTube";
import Facebook from "@material-ui/icons/Facebook";
import {Link, useHistory } from 'react-router-dom';

function App() {
    const history = useHistory();

    const Next = () => {
        history.push('/createaccount5')
    }
      


  return (
    <div className="app">
      <div className="wrappercreateaccount1">
        <h1>Sign Up</h1>
        <h3>It's Time to connect Socially</h3>
        <div className="con-inputcreateaccount1">
         <input placeholder="Instagram (profile url)" type="text" />
         <i className="icon">
            <Instagram />
          </i>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccount1">
         <input placeholder="Facebook (profile url)" type="text" />
         <i className="icon">
            <Facebook />
          </i>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccount1">
         <input placeholder="Youtube (channel url)" type="text" />
         <i className="icon">
            <Youtube />
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