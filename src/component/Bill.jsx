import React from 'react';
import {Card} from "react-bootstrap";

const Bill = () => {
    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-sm-12 grid-margin">
                <Card>
                    <Card.Header className="text-center">e-Bazaar</Card.Header>
                    <Card.Body>
                        <div className="row mb-4">
                            <div className="col-sm-6 grid-margin">
                                <Card.Title className="text-center">Seller</Card.Title>
                                <Card.Text className="text-center">Name:</Card.Text>
                            </div>
                            <div className="col-sm-6 grid-margin">
                                <Card.Title className="text-center">Customer</Card.Title>
                                <Card.Text className="text-center">Name:</Card.Text>
                                <Card.Text className="text-center">Address:</Card.Text>
                                <Card.Text className="text-center">Mobile Number:</Card.Text>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-sm-12 grid-margin">
                                <Card.Title className="text-center">Items</Card.Title>
                                <Card.Text className="text-center">hello</Card.Text>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                </div>
            </div>
        </div>
    )
}

export default Bill;
