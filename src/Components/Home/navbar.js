import React from "react";
import "./navbar.css";
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {connect} from 'react-redux'
import {Button,NavItem,Navbar,Icon} from "react-materialize"
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
  
const changeAuthentication = () =>{
  localStorage.removeItem('token')
  props.setAuth(false);
  window.location.href="/"
}
  return (
    <div>

{!props.isAuthenticated?<Navbar
  alignLinks="right"
  brand={<a href="/" class="brand-logo"><div class="logo">
  <img src={require("./2.png").default} alt={"levance-navbar-full-logo"} />
  </div></a>}
  id="mobile-nav"
  menuIcon={<Icon className="black-text">menu</Icon>}
  options={{
    draggable: true,
    edge: 'left',
    inDuration: 250,
    onCloseEnd: null,
    onCloseStart: null,
    onOpenEnd: null,
    onOpenStart: null,
    outDuration: 200,
    preventScrolling: true
  }}
  fixed={true}
  className="white black-text"
>
  <NavItem>
  <Button style={{backgroundColor:"#4c4b77"}}><Link class='link' to={'/createaccount1'} style={{color:"white"}}>
        I'm an Influencer
        </Link></Button>
  </NavItem>
  <NavItem>
  <Button style={{backgroundColor:"#4c4b77"}}><Link class='link'  style={{color:"white"}} to={'/brandregister'} >
        I'm a Brand
        </Link></Button>
  </NavItem>
  <NavItem>
  <a href="mailto:contact@levance.in" class='link' >
        Contact Us
        </a>
  </NavItem>
  <NavItem>
    <Link class='link' to={'/signin'} >
        Sign In
        </Link>
  </NavItem>
</Navbar>:
<Navbar
  alignLinks="right"
  brand={<a href="/" class="brand-logo"><div class="logo">
  <img src={require("./2.png").default} alt={"levance-navbar-full-logo"} />
  </div></a>}
  id="mobile-nav"
  fixed={true}
  menuIcon={<Icon className="black-text">menu</Icon>}
  options={{
    draggable: true,
    edge: 'left',
    inDuration: 250,
    onCloseEnd: null,
    onCloseStart: null,
    onOpenEnd: null,
    onOpenStart: null,
    outDuration: 200,
    preventScrolling: true
    
  }}
  className="white black-text"
  
>
  {/* <NavItem>
    <Link to="/dashboard" class="link">
      Dashboard
    </Link>
  </NavItem> */}
  <NavItem>
  <a href="mailto:contact@levance.in" class='link' >
        Contact Us
        </a>
  </NavItem>
  <NavItem>
  <Link className='link' onClick={changeAuthentication}>Sign Out</Link>
  </NavItem>
</Navbar>
}





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
