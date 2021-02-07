import React, { useState } from "react";
import "./p1.css";
import AppleIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import Web from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link, useHistory } from 'react-router-dom';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Swal from 'sweetalert2';
import {connect} from 'react-redux';
import Navbar from '../Home/navbar';
import axios from 'axios'
import M from 'materialize-css'
import { BASE_URL } from "../../Config/config.json";
import CommentIcon from '@material-ui/icons/Comment';

function App() {
  const validate = RegExp(/^[.a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    const history = useHistory();
    const [loader,setLoader] = useState(false)
    const [valid, setValid] = useState(true);
    const [validphone, setValidphone] = useState(true);
  const [brandData,setBrandDate] = useState({
      name:"",
      email:"",
      brand:"",
      phone:"",
      reached:"",
      website:"",
      comment:null
  });
  const emailVerify = (e) => {
    setValid(validate.test(e.target.value));
    console.log(valid)
  }
  
  const phoneVerify = (e) => {
    setValidphone(false);
    let x = e.target.value
    if (x.length == 10) {
      setValidphone(true);
    }
  }
    const Submit = () => {
        if(!brandData.name||!brandData.email||!brandData.brand||!brandData.phone||!brandData.reached)
        return Swal.fire({
          title: 'Details Error',
          text: 'Please fill all details.',
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Okay',
        })
        setLoader(true)
        axios({
          url:BASE_URL+"/brandregister",
          method:"POST",
          data:brandData
        }).then(res=>{
          setLoader(false)
          if(res.data.error)
          return M.toast({html:res.data.error})
          Swal.fire({ 
            title: 'Successfull',
            text: `Your details have been submitted successfully. We'll contact you soon!`,
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Cool',
          }).then(() => {
            history.push('/')
          })

        })
    }
      
  return (
    <>
    <Navbar/>
    <div className="appcreateaccount1 container-fluid">
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s12 m12" >
      <div className="wrappercreateaccount1" >
        <div className="con-inputcreateaccount1">
         <input placeholder="Full Name" type="text" onChange={val =>{setBrandDate({
             ...brandData,
                name:val.target.value
         })} } />
         <i className="icon">
            <AccountCircleIcon/>
          </i>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccount1">
         <input placeholder="Brand Name" type="text" onChange={val =>{setBrandDate({
             ...brandData,
                brand:val.target.value
         })}}  />
         <i className="icon">
            <AppleIcon/>
          </i>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccount1">
         <input placeholder="Website/Social Media Handle" type="text" onChange={val =>{setBrandDate({
             ...brandData,
                website:val.target.value
         })}}  />
         <i className="icon">
            <Web/>
          </i>
          <div className="bg"></div>
        </div>

        <div className={valid || brandData.email === "" ? "con-inputcreateaccount1" : "invalid"}>
         <input placeholder="Email" type="email" onBlur={val => setBrandDate({
             ...brandData,
                email:val.target.value
         })} onChange={emailVerify} />
         <i className="icon">
            <EmailIcon />
          </i>
          <div className="bg"></div>
        </div>
        <div className="con-inputcreateaccount1">
         <input placeholder="Phone" type="text" onChange={val => setBrandDate({
             ...brandData,
                phone:val.target.value
         })} />
         <i className="icon">
         <PhoneIphoneIcon />
          </i>
          <div className="bg"></div>
        </div>
        <div className="con-inputcreateaccount1">
            <select class="city" required="true"  onChange={val => setBrandDate({
             ...brandData,
                reached:val.target.value
         })}>
                <option selected disabled>How did you hear about us?</option>
                <option value="email">Email</option>
                <option value="google">Google</option>
                <option value="instagram">Instagram</option>
                <option value="quora">Quora</option>
                <option value="influencer">Influencer</option>
                <option value="friend/colleague">Friend / Colleague</option>
                <option value="advertisement">Advertisement</option>
            </select>
            <i className="icon">
                    <ImportContactsIcon/>
                </i>
          <div className="bg"></div>
        </div>
        <div className="con-inputcreateaccount1">
         <input placeholder="Comment / Quote (optional)" type="text" onChange={val => setBrandDate({
             ...brandData,
                comment:val.target.value
         })} />
         <i className="icon">
            <CommentIcon />
          </i>
          <div className="bg"></div>
        </div>
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
        <button className="buttn" onClick={Submit} >Submit</button>
        
      </div>
      </div>
      </div>
    </div>
    </>
  );
}

export default App;