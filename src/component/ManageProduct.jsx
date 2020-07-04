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
const ManageProduct = () => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [discPrice, setdiscPrice] = useState(null);
  const [size, setSize] = useState(null);
  const [colour, setColour] = useState(null);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [deliveryDays, setdeliveryDays] = useState(null);
  const [seller, setSeller] = useState(null);
  const [img, setImg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title, 
      description,
      price,
      disc_price: discPrice,
      size,
      colour,
      category,
      type,
      delivery_in_days: deliveryDays,
      seller,
      img
    };
    console.log(data);
    fetch('/edit_items', {
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
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={e => setTitle((e.target.value))} type="text" placeholder="Enter Title" />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={e => setDescription(e.target.value)} type="text" placeholder="Enter Description" />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control onChange={e => setPrice(e.target.value)} type="text" placeholder="Enter Price" />
        </Form.Group>
        <Form.Group controlId="discPrice">
          <Form.Label>Discounted Price</Form.Label>
          <Form.Control onChange={e => setdiscPrice(e.target.value)} placeholder="Enter Discounted Price" />
        </Form.Group>
        <Form.Group controlId="size">
          <Form.Label>Size</Form.Label>
          <Form.Control onChange={e => setSize((e.target.value))} type="text" placeholder="Enter Size" />
        </Form.Group>
        <Form.Group controlId="colour">
          <Form.Label>Colour</Form.Label>
          <Form.Control onChange={e => setColour(e.target.value)} type="text" placeholder="Enter Colour" />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control onChange={e => setCategory(e.target.value)} type="text" placeholder="Enter Category" />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control onChange={e => setType(e.target.value)} placeholder="Enter Type" />
        </Form.Group>
        <Form.Group controlId="deliveryDays">
          <Form.Label>Delivery Days</Form.Label>
          <Form.Control onChange={e => setdeliveryDays(e.target.value)} type="text" placeholder="Enter Delivery Days" />
        </Form.Group>
        <Form.Group controlId="seller">
          <Form.Label>Seller</Form.Label>
          <Form.Control onChange={e => setSeller(e.target.value)} type="text" placeholder="Enter Seller" />
        </Form.Group>
        <Form.Group controlId="img">
          <Form.Label>Imag</Form.Label>
          <Form.Control onChange={e => setImg(e.target.value)} placeholder="Enter Img" />
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

export default ManageProduct;
