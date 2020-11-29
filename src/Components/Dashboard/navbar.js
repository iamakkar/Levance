import React from "react";
import "./navbar.css";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

function App(props) {

const history = useHistory()


const changeAuthentication = () =>{
  localStorage.removeItem('token')
  props.setAuth(false);
  window.location.href="/";
}
console.log(props.setAuth)
  return (
    <div>
        <div className="navbar-fixed">
        <nav>
    <div class="nav-wrapper white">
      <a href="/" class="brand-logo"><div class="logo">
        <img src={require("../Home/2.png")} alt={"Error-404"} />
        </div></a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons black-text">menu</i></a>
      <ul class="right hide-on-med-and-down">
        {props.isAuthenticated?
        <>
        <li><Link class='link' to='/dashboard'>Dashboard</Link></li>
<li><Link class='link' to={'#'} >
        Contact Us
        </Link></li>
        <li>
          <Link className='link' onClick={changeAuthentication}>Sign Out</Link>
        </li></>:
        <><li><Link class='link' to={'/createaccount1'} >
        I'm Influencer
        </Link></li>
<li><Link class='link' to={'#'} >
        I'm Brand
        </Link></li>
<li><Link class='link' to={'#'} >
        Contact Us
        </Link></li>
<li><Link class='link' to={'/signin'} >
        Sign In
        </Link></li></>
        }
      </ul>
    </div>
  </nav>
  
  </div>

  <ul class="sidenav" id="mobile-demo">
    <li><Link class='link' to={'/createaccount1'} >
                I'm Influencer
                </Link></li>
    <li><Link class='link' to={'/dashboard'} >
                I'm Brand
                </Link></li>
    <li><Link class='link' to={'#'} >
                Contact Us
                </Link></li>
    <li><Link class='link' to={'/signin'} >
                Sign In
                </Link></li>
  </ul>
      </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    setAuth: data => dispatch({
      type: 'SET_AUTH',
      authDone: data
    })
  }
}
const mapStateToProps = state => {
  return {
      isAuthenticated: state.userDetails.authDone
  }
}

export default connect( mapStateToProps,mapDispatchToProps)(App)
