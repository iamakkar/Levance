import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import Navbar from '../Home/navbar'
import Process from './Process';
import Footer from '../Home/footer';

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
    <Process />
    {/* <Footer/> */}
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