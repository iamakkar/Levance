import React from "react";
import "./final.css";
import axios from 'axios';
import {connect} from 'react-redux';
 
function App(props) {

    var college = props.college ? 'Yes' : 'No';

    const submit1 = async () => {
      axios.post('http://localhost:5000/createaccount', {email: props.email,
        password: props.password,
        fullName: props.fullName,
        username: props.username,
        phone: props.phone,
        gender: props.gender,
        city: props.city,
        college: college,
        categories: props.categories
      }).then(res => console.log(res)).catch((e) => console.log(e))
    }
    
  return (
    <div className="app">
      <div className="wrappercreateaccount1">
        <h1>Confirm Details</h1>
        
        <div className="con-inputcreateaccount1">
  <label>{`Name : ${props.fullName}`}</label>
          <div className="bg"></div>
        </div>
 
        <div className="con-inputcreateaccount1">
          <label>{`Username : @${props.username}`}</label>
          <div className="bg"></div>
        </div>
        
        <div className="con-inputcreateaccount1">
          <label>{`Phone No : ${props.phone}`}</label>
          <div className="bg"></div>
        </div>
        
        <div className="con-inputcreateaccount1">
          <label>{`Email : ${props.email}`} </label>
          <div className="bg"></div>
        </div>
 
        <div className="con-inputcreateaccount1">
          <label>{`Gender : ${props.gender}`} </label>
          <div className="bg"></div>
        </div>
 
        <div className="con-inputcreateaccount1">
          <label>{`City : ${props.city}`}</label>
          <div className="bg"></div>
        </div>
 
        <div className="con-inputcreateaccount1">
          <label>{`Are you in College : ${college}`} </label>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccount1">
          <label>{`Prefered Categories : ${props.categories}`} </label>
          <div className="bg"></div>
        </div>
        
        <button className="btn" onClick={submit1} >Confirm</button>
        
      </div>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        fullName: state.userDetails.fullName, 
        username: state.userDetails.username, 
        phone: state.userDetails.phone, 
        email: state.userDetails.email, 
        gender: state.userDetails.gender, 
        city: state.userDetails.city, 
        college: state.userDetails.college,
        categories: state.userDetails.categories,
    }
}
 
export default connect(mapStateToProps, undefined)(App);