import React ,{useState}from 'react';
import {Tabs,Tab, Button,Modal,InputGroup,FormControl,Form } from 'react-bootstrap';
const SignIn = () =>{
const [username,setusername]=useState(null);
const [password,setPassword]=useState(null);
console.log(username,password)
    return(
      <Form>
            <Form.Group controlId="usernameGroup">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={e => setusername((e.target.value))} type="text" placeholder="Enter Username" />
        </Form.Group>
    
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" 
        placeholder="Password" 
        onChange={e => setPassword((e.target.value))}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>       
    );
    }  
            
 export default SignIn;           