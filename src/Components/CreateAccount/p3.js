import React, {useState} from "react";
import "./p1.css";
import Person from '@material-ui/icons/PersonPin';
import Lock from "@material-ui/icons/Lock";
import Eye from "@material-ui/icons/VisibilitySharp";
import Eyecut from "@material-ui/icons/VisibilityOffSharp";
import {Link, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import Navbar from '../Home/navbar';
import axios from 'axios'
import { BASE_URL } from "../../Config/config.json";

function App(props) {

const history = useHistory();

const [visible, setVisible] = useState(false);
const [cvisible, setCVisible] = useState(false);
const [checked, setChecked] = useState(true);
const [check_username,setCheckUsername] = useState(false)
const [username,setUsername] = useState("")
function PasswordShow() {
    setVisible(!visible)
  }

  function ConfirmPasswordShow() {
    setCVisible(!cvisible)
  }
  const checkUsername = (e) =>{
    setUsername(e.target.value.toLowerCase())
    try{
    axios({
      url:BASE_URL+"/checkusername",
      method:"POST",
      data:{
        "username":e.target.value.toLowerCase()
      }
    }).then(res=>{
      setCheckUsername(res.data.message);
      console.log(res.data.message)
    })}
    catch(err){
      console.log(err)
    }
  }
  function passwordCheck(e) {
    if (e.target.value === props.password ) {
      setChecked(true);
    } else {
      setChecked(false);
    } 
  }

const Next = async () => {
  
  try{
    await axios({
      url:BASE_URL+"/checkusername",
      method:"POST",
      data:{
        "username":username
      }
    }).then(res=>{
      setCheckUsername(res.data.message);
      console.log(res.data.message)
      if(res.data.message)
      {
        return Swal.fire({
          title: 'Username Error',
          text: 'Username Already exists',
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Okay',
        })
      }
      if (props.password.length < 6) {
        return Swal.fire({
          title: 'Too Short',
          text: 'Please fill password of at least 6 characters',
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Okay',
        })
      }
      if(!checked) {
        return Swal.fire({
          title: `Doesn't Match`,
          text: `Password and confirm password doesn't match`,
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Okay',
        })
      }
    
       else {
        history.push('/createaccount4')
      }
    })}
    catch(err){
      console.log(err)
    }
    
  if (props.username === '') {
    return Swal.fire({
      title: 'Username Missing',
      text: 'Please fill the the username',
      icon: 'warning',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Okay',
    })
  }

  
}

  return (<>
  <Navbar/>
    <div className="appcreateaccount1 container-fluid">
      <div className="row">
        <div className="col s12 m12">
          
      <div className="wrappercreateaccount1">
        <h1>Sign Up</h1>
        
        <div className="con-inputcreateaccount1">
         <input placeholder="Pick username" type="text" onBlur={val => {props.setUsername(val.target.value);}} onChange={val=>checkUsername(val)} />
         <i className="icon">
            <Person />
          </i>
          <div className="bg"></div>
        </div>
        {check_username&&<p style={{color:"red"}}>Username already exists</p>}
        <div className="con-inputcreateaccount1">
         <input placeholder="Password"  type={!visible ? "password" : "text"} onBlur={val => {props.setPassword(val.target.value);passwordCheck(val)}} />
         <i className="icon">
            <Lock />
          </i>
          <i onClick={() => PasswordShow()}>
            {!visible ? <Eyecut /> : <Eye />}
          </i>
          <div className="bg"></div>
        </div>
        
        <div className={checked ? "con-inputcreateaccount1" : 'invalid'}>
        <input placeholder="Confirm Password"  type={!cvisible ? "password" : "text"} onChange={(val) => passwordCheck(val)} onBlur={(val) => passwordCheck(val)} />
        <i className="icon">
            <Lock />
          </i>
          <i onClick={() => ConfirmPasswordShow()}>
            {!cvisible ? <Eyecut /> : <Eye />}
          </i>
          <div className="bg"></div>
        </div>
        
        <button className="buttn" onClick={Next} disabled={check_username} >Next</button>
        <span>or</span>
        <div className="afteror">
          
            <Link to={'/signin'} className="new">Already have an account</Link>
          
        </div>
      </div>
      
      </div>
      </div>
    </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    password: state.userDetails.password,
    username: state.userDetails.username,
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