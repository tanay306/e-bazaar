import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, Modal } from "react-bootstrap";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Login = () => {
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
      {isLoggedIn ? <h4 style={{ color: 'white' }}>{username}</h4> : <a className="text-white mt-2 ml-2" onClick={handleShow}><h4>Login</h4></a>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div>
        <Tabs
              defaultActiveKey="Sign in"
              id="loginTabs"
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="Sign up" title="Sign up">
                <SignUp />
              </Tab>
              <Tab eventKey="Sign in" title="Sign in">
                <SignIn handleClose={handleClose}/>
              </Tab>
            </Tabs>
            </div>
        </Modal.Body>
      </Modal>
    </> 
  );
};

export default Login;
