import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
const SignUp = () => {
  const [username, setusername] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [area, setArea] = useState(null);
  const [pincode, setPinCode] = useState(null);
  const [state, setState] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [password, setPassword] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      full_name: fullName,
      email,
      address,
      area,
      city_with_pincode: pincode,
      state,
      mobile_number: mobileNumber,
      password
    };
    console.log(data);
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application-json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="usernameGroup">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={e => setusername((e.target.value))} type="text" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control onChange={e => setFullName(e.target.value)} type="text" placeholder="Enter Full Name" />
        </Form.Group>
        <Form.Group controlId="emailGroup">
          <Form.Label>Email</Form.Label>
          <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter Email" />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows="3" onChange={e => setAddress(e.target.value)} placeholder="Enter Address" />
        </Form.Group>
        <Form.Group controlId="area">
          <Form.Label>Area/Locality</Form.Label>
          <Form.Control onChange={e => setArea(e.target.value)} type="text" placeholder="Enter Area" />
        </Form.Group>
        <Form.Group controlId="pinCode">
          <Form.Label>Pin Code</Form.Label>
          <Form.Control onChange={e => setPinCode(e.target.value)} type="number" placeholder="Enter Pin Code" />
        </Form.Group>
        <Form.Group controlId="State">
          <Form.Label>State</Form.Label>
          <Form.Control onChange={e => setState(e.target.value)} type="text" placeholder="Enter State" />
        </Form.Group>
        <Form.Group controlId="mobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control onChange={e => setMobileNumber(e.target.value)} type="number" placeholder="Enter Mobile Number" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>   
    </div>
  );
};

export default SignUp;
