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
      <InputGroup.Text>@example.com</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>

  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>Password</InputGroup.Text>
    </InputGroup.Prepend>
    
  </InputGroup>
  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>Confirm Password</InputGroup.Text>
    </InputGroup.Prepend>
    
  </InputGroup>
                          

              
            

            </div>
    );
    }  
            
 export default SignIn;           