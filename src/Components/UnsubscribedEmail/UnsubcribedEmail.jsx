import React, { useState } from "react";
import "../CreateAccount/p1.css";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import {Link, useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {connect} from 'react-redux';
import Navbar from '../Home/navbar';
import {sha256} from "js-sha256";
import axios from 'axios'
import M from 'materialize-css'
import {BASE_URL} from "../../Config/config.json"
function App(props) {
    const history = useHistory();
    const {email} = useParams();
    const [message,setMessage] = useState(false)
    console.log(email)
    axios({
        method:"POST",
        url:BASE_URL+"/unsubscribeEmail",
        data:{
            email:email
        }
    }).then(res=>{
        setMessage(res.data.message)
    })
  return (
    <>
    <Navbar/>
    <div className="appcreateaccount1 container-fluid">
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s12 m12">
      <div className="wrappercreateaccount1">
          {!email&&<h6   style={{marginTop:"10px",textAlign:"justify"}} >Use Unsubscribe link in your email</h6>}
        {message&&<h6   style={{marginTop:"10px",textAlign:"justify"}} >You have been unsubscribed from our newsletter.</h6>}
        {!message&&<div class="preloader-wrapper small active" style={{marginTop:"10px"}}>
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
        <img src={require("../Home/2.png").default}/>
      </div>
      </div>
      </div>
    </div>
    </>
  );
}


export default connect(undefined,undefined)(App);