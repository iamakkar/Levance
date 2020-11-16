import React, {useEffect} from "react";
import "./wrapper.css";
// import Nav from "./navbar";
import MainNew from './main_new'
import {connect} from 'react-redux'
// import Main from "./main";


function App(props) {

  useEffect(() => {
    if(localStorage.getItem('authdone')) {
      props.setAuth(true)
    }
  },[props.authDone])

  return (
    <>
      <div className="main">
       
        <MainNew />
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    authDone: state.userDetails.authDone
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAuth: data => {
      dispatch({
        type: 'AUTH_DONE',
        authDone: data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)