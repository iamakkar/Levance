import React, { useState } from "react";
import "./final.css";
import axios from 'axios';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import {BASE_URL} from "../../Config/config.json"
import Navbar from '../Home/navbar'

function App(props) {
  const [loader,setLoader] = useState(false);
    var college = props.college ? 'Yes' : 'No';

    var history = useHistory();

    const submit1 = async () => {
      
      if(props.password==""||props.fullName==""||props.username==""||props.phone==""||props.gender==""||props.city==""||props.categories.length==0)
      {
        return Swal.fire({
          title: 'Details Missing',
          text: 'Please fill all the details',
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Okay',
        })
      }else{
        setLoader(true)
      await axios.post(BASE_URL+'/createaccount', {email: props.email,
        password: props.password,
        fullName: props.fullName,
        username: props.username,
        phone: props.phone,
        gender: props.gender,
        city: props.city,
        college: props.college,
        categories: props.categories,
        facebook:props.facebook,
        instagram:props.instagram,
        youtube:props.youtube,
      }).then((res) => {
        setLoader(false)
        if(res.data.error)
        Swal.fire({ 
          title: 'Error',
          text: 'Email ID already exists',
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Okay',
        }).then(() => {
          
          history.push('/signin')
        })
        else
        {
          setLoader(false)
        Swal.fire({
           
          title: 'Account Created. Kindly login to see your profile',
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Cool',
        }).then(() => {
          history.push('/signin')
        })}
      }).catch((e) => {
        setLoader(false)
        console.log(e)})}
    }
    
  return (<>
  <Navbar/>
    <div className="app">
      <div className="wrappercreateaccountfinal">
        <h1>Confirm Details</h1>
        
        <div className="con-inputcreateaccountfinal">
  <label>{`Name : ${props.fullName}`}</label>
          <div className="bg"></div>
        </div>
 
        <div className="con-inputcreateaccountfinal">
          <label>{`Username : @${props.username}`}</label>
          <div className="bg"></div>
        </div>
        
        <div className="con-inputcreateaccountfinal">
          <label>{`Phone No : ${props.phone}`}</label>
          <div className="bg"></div>
        </div>
        
        <div className="con-inputcreateaccountfinal">
          <label>{`Email : ${props.email}`} </label>
          <div className="bg"></div>
        </div>
 
        <div className="con-inputcreateaccountfinal">
          <label>{`Gender : ${props.gender}`} </label>
          <div className="bg"></div>
        </div>
 
        <div className="con-inputcreateaccountfinal">
          <label>{`City : ${props.city}`}</label>
          <div className="bg"></div>
        </div>
 
        <div className="con-inputcreateaccountfinal">
          <label>{`Are you in College : ${college}`} </label>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccountfinal">
          <label>{`Prefered Categories : ${props.categories}`} </label>
          <div className="bg"></div>
        </div>
        <p>By signing up, you accept our <a href={require("../../Config/Terms_&_Conditions.pdf").default} target="_blank">Terms {'&'} Conditions</a> and <a href={require("../../Config/Privacy_Policy.pdf").default} target="_blank">Privacy Policy</a></p>
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
        <button className="buttn" onClick={submit1} >Confirm</button>
        
      </div>
    </div>
    </>
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
        password: state.userDetails.password,
        facebook:state.userDetails.facebook,
        instagram:state.userDetails.instagram,
        youtube:state.userDetails.youtube,
    }
}
 
export default connect(mapStateToProps, undefined)(App);