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
const manageProduct = () => {
  const [category, setcategory] = useState(null);
  const [name, setname] = useState(null);
  const [description, setdescription] = useState(null);
  const [price, setprice] = useState(null);

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
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control onChange={e => setcategory((e.target.value))} type="text" placeholder="Enter Category" />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={e => setname(e.target.value)} type="text" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={e => setdescription(e.target.value)} type="text" placeholder="Enter Description" />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control onChange={e => setprice(e.target.value)} placeholder="Enter Price" />
        </Form.Group>
        <Button variant="primary" type="submit">
        Cancel
        </Button>
        <Button variant="primary" type="submit">
        Add
        </Button>
      </Form>
    </div>
  );
};

export default manageProduct;
