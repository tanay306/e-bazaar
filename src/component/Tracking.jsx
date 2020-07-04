import React from 'react';
import Stepper from 'react-stepper-horizontal';
import {Button,Card} from "react-bootstrap";

const Tracking = () => {
    return (
        <div>
            <Card style={{ width: '20rem', height: '220px' }}>
                <h3 className="text-center">Order ID: </h3>
                <Stepper steps={ [{title: 'Ordered'}, {title: 'Shipped'}, {title: 'Out For Delivery'}, {title: 'Delivered'}] } activeStep={ 2 } />
                <div className="buttons">
                    <Button variant="danger" size="lg" className="align-center">Cancel Order</Button>{' '}
                    <Button variant="primary" size="lg" className="align-center">Show Bill</Button>{' '}
                </div>
            </Card>
        </div>
    )
}

export default Tracking;
