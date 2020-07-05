import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SingleStatus = (id, prevStatus) => {
    const [status, setStatus] = useState(prevStatus);
    const handleChange = (e) => {
        setStatus(e.target.value);
        fetch(`/update_status/${id}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application-json'
        }, body: JSON.stringify({ status })
          })
        .then(res=>res.json())
        .then((res)=> {
          console.log(res);
    
        })
        .catch(err=>console.log(err));
    }
    return (
        <Form>
        <Form.Group controlId="formGridState">
        <Form.Control as="select" value={status} onChange={(e) => handleChange(e)}>
            <option value="Ordered">Ordered</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
        </Form.Control>
        </Form.Group>
    </Form>
    )
};

export default SingleStatus;