import React from 'react';
import {Card,ListGroup,ListGroupItem,Button} from 'react-bootstrap';
const AllProduct = ()=>{
    return(
      <Card style={{ width: '25%', height: '25%' }}>
      <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41%2BfXlXMPyL.jpg" alt="Aloevera Gel"/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text style={{backgroundColor:'black'}}>
         <ul>
           <li>Category</li>
           <li>Price</li>
         </ul>
        </Card.Text >
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    );
}
export default AllProduct;