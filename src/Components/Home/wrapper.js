import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import Navbar from './navbar'
import Main from './main';
import Footer from './footer';

function App(props) {

  useEffect(() => {
    const get = localStorage.getItem('token');
    if (get) {
      props.setAuth(true)
    }
  })

  return (
    <>
   <Navbar />
    <Main />
    <Footer />
    </> 
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setAuth: data => {
      dispatch({
        type: 'SET_AUTH',
        authDone: data
      })
    }
  }
}

export default connect(undefined, mapDispatchToProps)(App)