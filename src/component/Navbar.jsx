import React from 'react';
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import Login from './Login';

const NavbarComponent = () => {
  return (<>
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="#home">e-bazaar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
     <Login />
    </Navbar>
    <br />
  </>)
};

export default NavbarComponent;