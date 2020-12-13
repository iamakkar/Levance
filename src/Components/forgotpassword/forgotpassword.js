import React, { useState } from "react";
import "../CreateAccount/p1.css";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import {Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {connect} from 'react-redux';
import Navbar from '../Home/navbar';
import {sha256} from "js-sha256";
import axios from 'axios'
import M from 'materialize-css'
import {BASE_URL} from "../../Config/config.json"
function App(props) {
    const history = useHistory();
    const [email,setEmail]=useState("")
    const [verifyotp,setVerifyotp] = useState(false)
    const [hashotpclient,setHashotpclient] = useState("")
    const [hashotpserver,setHashotpserver] = useState("")
    const [waitotp,setwaitotp] = useState(false)
    const [token,setToken] = useState("")
    const [loader,setLoader] = useState(false);
    const [password,setPassword] = useState({
      password:"",
      confirmPassword:""
    })
    
    const EmailOtpsent = ()=>{
      setLoader(true)
        try{
        axios({
            url:BASE_URL+"/forgotpasswordotp",
            method:"POST",
            data:{"email":email}
        }).then(res=>{
          setLoader(false)
            if(res.data.error)
            return M.toast({html:res.data.error})
            
            setHashotpserver(res.data.hash);
            setToken(res.data.token)
            setwaitotp(true)
        })}
        catch(err){
            console.log(err)
            setLoader(false)
        }
    }
    const createhash = (e)=>{
        
        setHashotpclient(sha256(e.target.value))
    }
    const checkHash = ()=>{
      if(hashotpserver===hashotpclient)
      setVerifyotp(true)
      else
      M.toast({html:"Wrong OTP"})
    }
    const resetpassword= () =>{
      if(password.password.length<6)
      return Swal.fire({
        title: 'Password Error',
        text: 'Password should be atleast 6 characters',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
      if(password.password!=password.confirmPassword)
      return Swal.fire({
        title: 'Password Error',
        text: "Passwords doesn't match",
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
      axios({
        url:BASE_URL+"/forgotpassword",
        method:"POST",
        data:{
          token:token,
          password:password.password
        }
      }).then(res=>{
        if(res.data.error)
        {
          M.toast(res.data.error)
        }
        else{
          Swal.fire({ 
            title: 'Successfull',
            text: 'Your password has been updated successfully',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Cool',
          }).then(() => {
            history.push('/signin')
          })
        }
      })
    }
  return (
    <>
    <Navbar/>
    <div className="appcreateaccount1 container-fluid">
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s12 m12">
      <div className="wrappercreateaccount1">
        <h1   style={{marginTop:"10px"}}>Forgot Password</h1>
        
        {!waitotp&&<div className="con-inputcreateaccount1">
         <input placeholder="Enter email id" type="email" disabled={waitotp} onChange={(val)=>setEmail(val.target.value)}/>
         <i className="icon">
             <EmailIcon/>
            
          </i>
          <div className="bg"></div>
        </div>}
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
        {!waitotp&&<button className="buttn" onClick={EmailOtpsent} >Submit</button>}
        {waitotp&&!verifyotp&&<div className="con-inputcreateaccount1">
         <input placeholder="OTP" type="password" disabled={verifyotp} onChange={(e)=>{createhash(e)}} />
         <i className="icon">
         <VpnKeyIcon />
          </i>
          <div className="bg"></div>
        </div>}
        
        {waitotp&&!verifyotp&&<button className="buttn" onClick={checkHash} >Verify Otp</button>}
        {verifyotp&&<div className="con-inputcreateaccount1">
         <input placeholder="New Password" type="password" onChange={(e)=>{setPassword({
           ...password,
           password:e.target.value
         })}}/>
         <i className="icon">
            <LockIcon />
          </i>
          <div className="bg"></div>
        </div>}
        {verifyotp&&<div className="con-inputcreateaccount1">
        
         <input placeholder="Confirm Password" type="password" onChange={(e)=>{setPassword({
           ...password,
           confirmPassword:e.target.value
         })}}/>
         <i className="icon">
            <LockIcon />
          </i>
          <div className="bg"></div>
          <br/>
          
        </div>}
        {verifyotp&&password.confirmPassword!=password.password&&<p>Password doesn't match</p>}
         
        {waitotp&&verifyotp&&<button className="buttn" onClick={resetpassword}>Reset Password</button>}
        <span>or</span>
        <div className="afteror">
          
            <Link to={'/signin'} className="new" >Sign In</Link>
          
        </div>
      </div>
      </div>
      </div>
    </div>
    </>
  );
}


export default connect(undefined,undefined)(App);