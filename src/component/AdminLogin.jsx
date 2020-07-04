import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, Modal } from "react-bootstrap";
import SignIn from "./SignIn";

const AdminLogin = () => {
  useEffect(() => {
    if (localStorage.getItem('username')) {
      setIsLoggedIn(true);
      setusername(localStorage.getItem('username'));
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setusername] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [key, setKey] = useState("Sign in");
  return (
    <>
<Button variant="primary" onClick={handleShow}>Admin Login</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div>
        <SignIn handleClose={handleClose}/>
            </div>
        </Modal.Body>
      </Modal>
    </> 
  );
};

export default AdminLogin;
