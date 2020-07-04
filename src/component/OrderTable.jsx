import React from 'react';
import {Table,Dropdown,Form} from "react-bootstrap";

const OrderTable = () => {
    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-sm-12 grid-margin">
                    <div className="card h-100">
                        <div className="card-body">
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                    <th>Order ID:</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1</td>
                                    <td>
                                        <Form>
                                            <Form.Group controlId="formGridState">
                                            <Form.Control as="select" value="Choose...">
                                                <option>Ordered</option>
                                                <option>Shipped</option>
                                                <option>Out For Delivery</option>
                                                <option>Delivered</option>
                                                <option>Cancelled</option>
                                            </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderTable;
