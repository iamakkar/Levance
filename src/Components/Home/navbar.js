import React, { useState,  } from 'react';
import Menu from '@material-ui/icons/Menu'
import Cross from '@material-ui/icons/Close'

// import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  

  const handleClick = () => setClick(!click);
  

  

  

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <span className='navbar-logo'>
            Levance
          </span>
          {window.innerWidth < 960 ? <div className='menu-icon' onClick={handleClick}>
            <i>
              {click ? <Cross /> : <Menu />}
            </i>
            </div> : null}         
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className={click || window.innerWidth > 960 ? 'nav-item' : 'nav-item-false'}>
                I am an Influencer 
            </li>
            <li className={click || window.innerWidth > 960 ? 'nav-item' : 'nav-item-false'}>
               I am a Brand
            </li>
            <li className={click || window.innerWidth > 960 ? 'nav-item' : 'nav-item-false'}>
            Help  
            </li>
            <button className={click || window.innerWidth > 960 ? 'button' : 'nav-item-false'} >Sign In</button>
          </ul>
          
        
      </nav>
    </>
  );
}

export default Navbar;