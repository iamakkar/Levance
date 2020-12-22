import React from "react";
import "./p1.css";
import Instagram from '@material-ui/icons/Instagram';
import Youtube from "@material-ui/icons/YouTube";
import Facebook from "@material-ui/icons/Facebook";
import {Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {connect} from 'react-redux';
import Navbar from '../Home/navbar';

function App(props) {
    const history = useHistory();
  const validInsta = /instagram.com\//;
  const validFacebook = /facebook.com\//;
  const validYoutube = /youtube.com\//;
    const Next = () => {
        if(props.instagram === '' && props.facebook === '' && props.youtube === '' ) {
          return Swal.fire({
            title: 'Empty Details',
            text: 'Please fill at least 1 social media handle!',
            icon: 'warning',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Okay',
          })
        } 
        else 
        {if(props.instagram != '')
        {
          if(!validInsta.test(props.instagram))
          return Swal.fire({
            title: 'Details Error',
            text: 'Enter valid Instagram profile URL!',
            icon: 'warning',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Okay',
          })
          
        }
        else if(props.facebook != '')
        {

          if(!validFacebook.test(props.facebook))
          return Swal.fire({
            title: 'Details Error',
            text: 'Enter valid Facebook profile URL!',
            icon: 'warning',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Okay',
          })
          
        }
        else if(props.youtube != '')
        {
          if(!validYoutube.test(props.youtube))
          return Swal.fire({
            title: 'Details Error',
            text: 'Enter valid youtube profile URL!',
            icon: 'warning',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Okay',
          })
        }
          
            history.push('/createaccountfinal')
          
        
      }
    }
      
  return (
    <>
    <Navbar/>
    <div className="appcreateaccount1 container-fluid">
      <div className="row" style={{marginBottom:"0px"}}>
        <div className="col s12 m12">
      <div className="wrappercreateaccount1">
        <h1   style={{marginTop:"10px"}}>Sign Up</h1>
        <h4>It's Time to connect Socially</h4>
        <div className="con-inputcreateaccount1">
         <input placeholder="Instagram (profile url)" type="text" onChange={val => props.setInstagram(val.target.value)} />
         <i className="icon">
            <Instagram />
          </i>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccount1">
         <input placeholder="Facebook (profile url)" type="text" onChange={val => props.setFacebook(val.target.value)} />
         <i className="icon">
            <Facebook />
          </i>
          <div className="bg"></div>
        </div>

        <div className="con-inputcreateaccount1">
         <input placeholder="Youtube (channel url)" type="text" onChange={val => props.setYoutube(val.target.value)} />
         <i className="icon">
            <Youtube />
          </i>
          <div className="bg"></div>
        </div>

        
         
        <button className="buttn" onClick={Next} >Next</button>
        <span>or</span>
        <div className="afteror">
          
            <Link to={'/signin'} className="new" >Already have an account</Link>
          
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
  instagram: state.userDetails.instagram,
  facebook: state.userDetails.facebook,
  youtube: state.userDetails.youtube,
}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);