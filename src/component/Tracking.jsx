import React from 'react';
import Stepper from 'react-stepper-horizontal';
import {Button,Card} from "react-bootstrap";
import styles from './Tracking.module.css';

const Tracking = (props) => {
    return (
        <div>
            <Card className={`${styles.tracking} bg-warning`}>
    <h3 className="text-center" style={{ color:'black' }}>Order ID: {props.orderId}</h3>
                <Stepper steps={ [{title: 'Ordered'}, {title: 'Shipped'}, {title: 'Out For Delivery'}, {title: 'Delivered'}] } activeStep={ props.status } />
                {props.showButtons ? <div className="buttons">
                    <Button variant="danger" size="lg" className="align-center">Cancel Order</Button>{' '}
                    <Button variant="primary" size="lg" className="align-center">Show Bill</Button>{' '}
                </div>:null}
            </Card>
        </div>
    )
}

export default Tracking;
