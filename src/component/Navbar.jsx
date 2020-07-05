import React from 'react';
import {Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Login from './Login';
import Logout from './Logout';
import UserProfile from './UserProfle';
import AdminLogin from './AdminLogin';
import './Navbar.css';

const NavbarComponent = () => {
  const username = localStorage.getItem('username');
  return (<>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/"><h3>e-Bazaar</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/seller">Admin</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/" className="text-white"><h4>Home</h4></Nav.Link>
            <Nav.Link><Link to="/myCart" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }} className="text-white"><h4>MyCart</h4></Link></Nav.Link>
            <Nav.Link><Link to="/myOrders" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }} className="text-white"><h4>MyOrders</h4></Link></Nav.Link>
            {username ? 
              <NavDropdown title={`WELCOME ${username}`} id="basic-nav-dropdown" className="text-white">
              <NavDropdown.Item href="/userProfile"><Link to="/userProfile">User Profile</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item><Logout /></NavDropdown.Item>
            </NavDropdown> : <Login />   
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <br />
  </>)
};

export default NavbarComponent;