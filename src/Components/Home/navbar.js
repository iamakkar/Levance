import React from "react";
import "./navbar.css";
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {connect} from 'react-redux'

function App(props) {
  const history = useHistory();
  document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".sidenav");
    var options = {
      draggable: true,
      edge: "left",
      inDuration: 250,
      onCloseEnd: null,
      onCloseStart: null,
      onOpenEnd: null,
      onOpenStart: null,
      outDuration: 200,
      preventScrolling: true
    };
   M.Sidenav.init(elems, options);
  });
  console.log(props)
const changeAuthentication = () =>{
  localStorage.removeItem('token')
  props.setAuth(false);
  history.push('/')
}
  return (
    <div>
        <div className="navbar-fixed">
        <nav>
    <div class="nav-wrapper white">
      <a href="/" class="brand-logo"><div class="logo">
        <img src={require("./2.png")} alt={"Error-404"} />
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
