import React from "react";
import "./navbar.css";
import {Link} from 'react-router-dom'

export default  function App() {
  return (
    <div class="navbarhome">
        <div class="logo">
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
        </div>
      </div>
  )

}

