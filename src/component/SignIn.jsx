import React from 'react';
import {Tabs,Tab, Button,Modal,InputGroup,FormControl } from 'react-bootstrap';
const SignIn = () =>{
    return(
        <div>
            {/* user name */}
<InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">UserName</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup> 
{/* email*/}
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>Email</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="Amount (to the nearest dollar)" />
    <InputGroup.Append>
      <InputGroup.Text id="basic-addon1">@example.com</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Password"
      aria-label="Password"
      aria-describedby="basic-addon1"
    />
  </InputGroup> 
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Confirm Password</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="re-enter password"
      aria-label="re-enter password"
      aria-describedby="basic-addon1"
    />
  </InputGroup> 
  
                          

              
            

            </div>
    );
    }  
            
 export default SignIn;           