import React, { useState, useEffect } from 'react';
import {Card, Table, Button} from "react-bootstrap";
import get from 'lodash/get';

const Bill = (props) => {
    const [billData, setBillData] = useState(null);
    const [count, setCount] = useState(null);
    const [total, setTotal]= useState(null);
    const cartId = get(props, 'match.params.id', null);
    useEffect(() => {
        fetch(`/bill/${cartId}`,
        {
            method: 'GET',
            headers: {
              'Content-Type': 'application-json'
        }
          })
        .then(res=>res.json())
        .then((res)=> {
          console.log(res);
          setBillData(res.cart_items);
          setCount(res.count);
          setTotal(res.total);
        // this.setState({ product: res.details[0]}); 
        })
        .catch(err=>console.log(err));
    },[cartId])
    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-sm-12 grid-margin">
                <Card>
                    <Card.Header className="text-center">e-Bazaar</Card.Header>
                    <Card.Body>
                        <div className="row mb-4">
                            <div className="col-sm-6 grid-margin">
                                <Card.Title className="text-center"><b>Seller</b></Card.Title>
                                <Card.Text className="text-center"><b>Name:</b> Apple</Card.Text>
                            </div>
                            <div className="col-sm-6 grid-margin">
                                <Card.Title className="text-center"><b>Customer</b></Card.Title>
    <Card.Text className="text-center"><b>Name:</b> {localStorage.getItem('username')}</Card.Text>
    <Card.Text className="text-center"><b>UserId:</b> {localStorage.getItem('userId')}</Card.Text>
                                <Card.Text className="text-center"><b>Mobile Number:</b> 1234567890</Card.Text>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-sm-12 grid-margin">
                                <Card.Title className="text-center"><b>Items</b></Card.Title>
                                <Table size="sm">
                                    <thead>
                                    <tr>
                                            <th>Item Id</th>
                                            <th>Cart Id</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Discount Price</th>
                                            </tr>
                                    </thead>
                                {billData && billData.length > 0 ? billData.map((data) => {
                                    return (
                                        <tr>
                                            <td>{data && data.items && data.items.id ? data.items.id : '1'}</td>
                                            <td>{data.id}</td>
                                            <td>{data.title}</td>
                                            <td>{data.price}</td>
                                            <td>{data.disc_price}</td>
                                        </tr>
                                        
                                    );
                                }) : 'hi'}
                                </Table>
                                <div style={{ display: 'inline-flex', justifyContent:'space-evenly'}}>
                                <Card.Text><b>Count:</b> {count}</Card.Text>&nbsp;&nbsp;
                                <Card.Text><b>Total:</b> {total}</Card.Text>
                                </div>
                                <Card.Text><Button variant="primary">Download Invoice</Button></Card.Text>
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
