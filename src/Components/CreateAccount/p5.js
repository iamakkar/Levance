import React from "react";
import "./p1.css";
import Instagram from '@material-ui/icons/Instagram';
import Youtube from "@material-ui/icons/YouTube";
import Facebook from "@material-ui/icons/Facebook";
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import Navbar from '../Home/navbar';
const validate = RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);

function App(props) {
  const history = useHistory();

  const Next = () => {
    if (props.instagram === '' && props.facebook === '' && props.youtube === '') {
      return Swal.fire({
        title: 'Empty Details',
        text: 'Please fill at least 1 social media handle!',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    }
    else {

      history.push('/createaccountfinal')


    }
  }

  return (
    <>
      <Navbar />
      <div className="appcreateaccount1 container-fluid">
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col s12 m12">
            <div className="wrappercreateaccount1">
              <h1 style={{ marginTop: "10px" }}>Sign Up</h1>
              <h4>It's Time to Connect Socially</h4>
              <p>(Enter atleast one)</p>
              <div className="con-inputcreateaccount1">
                <input placeholder="Instagram (username)" type="text" onChange={val => props.setInstagram(val.target.value)} />
                <i className="icon">
                  <Instagram />
                </i>
                <div className="bg"></div>
              </div>
              {!validate.test(props.instagram.toLowerCase())&&<p style={{color:"red"}}>Username should match instagram requirements.</p>}

              <div className="con-inputcreateaccount1">
                <input placeholder="Facebook (username)" type="text" onChange={val => props.setFacebook(val.target.value)} />
                <i className="icon">
                  <Facebook />
                </i>
                <div className="bg"></div>
              </div>

              <div className="con-inputcreateaccount1">
                <input placeholder="Youtube (channel name)" type="text" onChange={val => props.setYoutube(val.target.value)} />
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