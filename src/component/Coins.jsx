import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Col,
  Row
} from "react-bootstrap";
const Coins = () => {
  return (
    <div className="container">
    <Card className="mt-3 mb-3">
    <h3 className="text-dark text-center"><u><strong>₹250 = 1 coin</strong></u></h3>
    <Form>
      <Form.Group controlId="formGroupNumber" className="ml-5 mr-5">
        <Form.Label className="text-dark"><h5>Card Number</h5></Form.Label>
        <Form.Control type="text" placeholder="Card Number" />
      </Form.Group>
      <Form.Group controlId="formGroupName" className="ml-5 mr-5">
        <Form.Label className="text-dark"><h5>Card Name</h5></Form.Label>
        <Form.Control type="text" placeholder="Card Name" />
      </Form.Group>
      <Form.Group controlId="formGroupMonth" className="ml-5 mr-5">
        <Form.Label className="text-dark"><h5>Expiry Month</h5></Form.Label>
        <Form.Control type="number" placeholder="Expiry Month" />
      </Form.Group>
      <Form.Group controlId="formGroupYear" className="ml-5 mr-5">
        <Form.Label className="text-dark"><h5>Expiry Year</h5></Form.Label>
        <Form.Control type="text" placeholder="Expiry Year" />
      </Form.Group>
      <Form.Group controlId="formGroupCVV" className="ml-5 mr-5">
        <Form.Label className="text-dark"><h5>CVV</h5></Form.Label>
        <Form.Control type="text" placeholder="CVV" />
      </Form.Group>
      <Form.Group controlId="formGroupAmount" className="ml-5 mr-5">
        <Form.Label className="text-dark"><h5>Amount</h5></Form.Label>
        <Form.Control type="number" placeholder="Amount in ₹" />
      </Form.Group>
      <Button variant="danger" size="lg" className="align-center mb-3 ml-5">Add Coins</Button>{' '}
    </Form>
    </Card>
    </div>
  );
};

export default Coins;