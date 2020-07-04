import React from 'react';
import {Table,Dropdown} from "react-bootstrap";

const OrderTable = () => {
    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-sm-12 grid-margin">
                    <div className="card h-100">
                        <div className="card-body">
                            <Table striped bordered hover size="sm" variant="dark">
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
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Status
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Ordered</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Shipped</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Out For Delivery</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Delivered</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Cancelled</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
