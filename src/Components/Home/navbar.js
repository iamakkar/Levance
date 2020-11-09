import React from "react";
import "./navbar.css";
import {Link} from 'react-router-dom'
import M from 'materialize-css'

export default  function App() {
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
    var instances = M.Sidenav.init(elems, options);
  });
  

  return (
    <div>
        {/* <div class="logo">
        <img src={require("./2.png")} alt={"Error-404"} />
        </div>
        <div class="items">
          <ul>
            <li class="item"><span>
                <Link class='link' to={'/createaccount1'} >
                I'm Influencer
                </Link>
                </span>
                </li>
            <li class="item"><span>I'm Brand</span></li>
            <li class="item"><span>Contact Us</span></li>
          </ul>
          <div className='signin' >
              <Link className='button' to={'/signin'} >
              Sign In
              </Link>
              
              </div>
        </div> */}
        <nav>
    <div class="nav-wrapper white">
      <a href="/home" class="brand-logo"><div class="logo">
        <img src={require("./2.png")} alt={"Error-404"} />
        </div></a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons black-text">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><Link class='link' to={'/createaccount1'} >
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
                </Link></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><Link class='link' to={'/createaccount1'} >
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
                </Link></li>
  </ul>
      </div>
  )

}

