import React from 'react';
import {Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfle';

const NavbarComponent = () => {
  const username = localStorage.getItem('username');
  return (<>
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="#home">e-bazaar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link><Link to="/myCart" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>MyCart</Link></Nav.Link>
        {username ? 
         <NavDropdown title={`Welcome ${username}`} id="basic-nav-dropdown">
         <NavDropdown.Item href="/userProfile"><Link to="/userProfile">User Profile</Link></NavDropdown.Item>
         <NavDropdown.Divider />
         <NavDropdown.Item><Logout /></NavDropdown.Item>
       </NavDropdown> : <Login />   
      }
      </Nav>
    </Navbar>
    <br />
  </>)
};

export default NavbarComponent;