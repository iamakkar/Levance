import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './Navbar.css';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
        {window.innerWidth < 768 ? <Navbar color="white" light expand="md">
        <NavbarBrand href="/">
            <img src='/assets/2.png' alt='err' />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar >
          <Nav navbar >
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/influencer">I'm an Influencer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/brand">I'm a Brand</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Navbar> :
        <>
            <div className="navbar-container" >
                <img src='/assets/2.png' alt='err' />
                <div className='nav-options'>
                    <a className="nav-link" href="/">Home</a>
                    <a className="nav-link" href="/influencer">I'm an Influencer</a>
                    <a className="nav-link" href="/brand">I'm a Brand</a>
                </div>
            </div>
        </>
        }
    </div>
  );
}

export default Example;