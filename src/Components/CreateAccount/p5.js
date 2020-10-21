import React from "react";
import "./p1.css";
import Instagram from '@material-ui/icons/Instagram';
import Youtube from "@material-ui/icons/YouTube";
import Facebook from "@material-ui/icons/Facebook";
import {Link, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';

function App(props) {
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
         <input placeholder="Instagram (profile url)" type="text" onBlur={val => props.setInstagram(val.target.value)} />
         <i className="icon">
            <Instagram />
          </i>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccount1">
         <input placeholder="Facebook (profile url)" type="text" onBlur={val => props.setFacebook(val.target.value)} />
         <i className="icon">
            <Facebook />
          </i>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccount1">
         <input placeholder="Youtube (channel url)" type="text" onBlur={val => props.setYoutube(val.target.value)} />
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

const mapDispatchToProps = dispatch => {
  return {
    setInstagram: data => {
      dispatch({
        type: 'SET_INSTAGRAM',
        instagram: data,
      })
    },
    setFacebook: data => {
      dispatch({
        type: 'SET_FACEBOOK',
        facebook: data,
      })
    },
    setYoutube: data => {
      dispatch({
        type: 'SET_YOUTUBE',
        youtube: data,
      })
    },
  }
}

export default connect(undefined, mapDispatchToProps)(App);