import React, {useState} from 'react';
import {Tabs,Tab, Button,Modal,InputGroup,FormControl, Navbar } from 'react-bootstrap';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ProductCard from './ProductCard';
import UserProfile from './UserProfle';
const Login = () => {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [key, setKey] = useState('Sign in');
        return (
          <>
         <Button as="input" type="reset" value="Login"  onClick={handleShow}/>
         
              
            
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>
                  <Tabs 
                  defaultActiveKey="Sign in" 
                  id="uncontrolled-tab-example"
                  onSelect={(k) => setKey(k)}>
  <Tab eventKey="Sign up" title="Sign up">
  <SignUp />
  </Tab>
  <Tab eventKey="Sign in" title="Sign in">
  <SignIn />
  </Tab>
  
</Tabs>
               </Modal.Title>
              </Modal.Header>
              <Modal.Body></Modal.Body>
              

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
            
           <ProductCard />
           <UserProfile />
          
        </>
          
          
        
        );
        
      }    

export default Login;