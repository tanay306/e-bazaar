import React, { useState } from "react";
import {
  Card,
  Tabs,
  Tab,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
const AddProduct = () => {
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

  const handleSubmit = (e) => {console.log(title)
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
    fetch('/add_items', {
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
    <div className="container">
      <h2 className="text-danger">Add Items</h2>
      <Card className="mb-5 mt-3">
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="ml-5 mr-5 mt-3">
            <Form.Label><h3 className="text-dark">Title</h3></Form.Label>
            <Form.Control onChange={e => setTitle((e.target.value))} type="text" size="lg" placeholder="Enter Title" />
          </Form.Group>
          <Form.Group controlId="description" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Description</h3></Form.Label>
            <Form.Control onChange={e => setDescription(e.target.value)} type="text" size="lg" placeholder="Enter Description" />
          </Form.Group>
          <Form.Group controlId="price" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Price</h3></Form.Label>
            <Form.Control onChange={e => setPrice(e.target.value)} type="number" size="lg" placeholder="Enter Price" />
          </Form.Group>
          <Form.Group controlId="discPrice" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Discounted Price</h3></Form.Label>
            <Form.Control onChange={e => setdiscPrice(e.target.value)} type="number" size="lg" placeholder="Enter Discounted Price" />
          </Form.Group>
          <Form.Group controlId="size" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Size</h3></Form.Label>
            <Form.Control onChange={e => setSize((e.target.value))} type="text" size="lg" placeholder="Enter Size" />
          </Form.Group>
          <Form.Group controlId="colour" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Colour</h3></Form.Label>
            <Form.Control onChange={e => setColour(e.target.value)} type="text" size="lg" placeholder="Enter Colour" />
          </Form.Group>
          <Form.Group controlId="category" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Category</h3></Form.Label>
            <Form.Control onChange={e => setCategory(e.target.value)} type="text" size="lg" placeholder="Enter Category" />
          </Form.Group>
          <Form.Group controlId="type" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Type</h3></Form.Label>
            <Form.Control onChange={e => setType(e.target.value)} type="text" size="lg" placeholder="Enter Type" />
          </Form.Group>
          <Form.Group controlId="deliveryDays" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Delivery Days</h3></Form.Label>
            <Form.Control onChange={e => setdeliveryDays(e.target.value)} type="text" size="lg" placeholder="Enter Delivery Days" />
          </Form.Group>
          <Form.Group controlId="seller" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Seller</h3></Form.Label>
            <Form.Control onChange={e => setSeller(e.target.value)} type="text" size="lg" placeholder="Enter Seller" />
          </Form.Group>
          <Form.Group controlId="img" className="ml-5 mr-5">
            <Form.Label><h3 className="text-dark">Image</h3></Form.Label>
            <Form.Control onChange={e => setImg(e.target.value)} type="text" size="lg" placeholder="Enter Image" />
          </Form.Group>
          <Button variant="danger" type="submit" size="large" className="mr-2 mb-2">
          Cancel
          </Button>
          <Button variant="success" type="submit" size="large" className="ml-2  mb-2">
          Add
          </Button>
        </Form>
        </Card>
    </div>
    </div>
  );
};

export default AddProduct;
