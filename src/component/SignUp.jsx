import React from 'react';
import {Tabs,Tab, Button,Modal,InputGroup,FormControl } from 'react-bootstrap';
const SignUp = () =>{
    return(
        <div>
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

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text placeholder="name@gmail.com">Email</InputGroup.Text>
    </InputGroup.Prepend>
    
    <InputGroup.Append>
      <InputGroup.Text>@example.com</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>

  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>With textarea</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="With textarea" />
  </InputGroup>
              

              
            

            </div>
    );
    }  
            
 export default SignUp;