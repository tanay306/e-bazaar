import React ,{useState}from 'react';
import {Button,Form } from 'react-bootstrap';
const SignIn = ({handleClose}) =>{
const [username,setusername]=useState(null);
const [password,setPassword]=useState(null);

const handleSubmit=(e)=>{
  e.preventDefault();
  const data={
    username,
    password
  };
  fetch('/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application-json'
}, body:JSON.stringify(data)
  })
.then(res=>res.json())
.then((res)=> {
  console.log(res);
  if (res.returning.username) {
    localStorage.setItem('userId', res.returning.userId);
    localStorage.setItem('username', res.returning.username);
    handleClose();
    window.location.reload();
  }
})
.catch(err=>console.log(err));
}
    return(
      <div>
      <Form onSubmit={handleSubmit}>
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
    </div>       
    );
    }  
            
 export default SignIn;           