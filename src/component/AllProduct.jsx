import React from 'react';
import {Card,ListGroup,ListGroupItem,Button,Row,Col,Container} from 'react-bootstrap';
const AllProduct = ()=>{
    return(
      <Container>
  
  <Row>
    <Col sm> <Card style={{ width: '100%', height: '100%' }}>
      <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41%2BfXlXMPyL.jpg" alt="Aloevera Gel"/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text style={{backgroundColor:'black'}}>
         <ul>
           <li>Category-Electronic</li>
           <li>Price</li>
         </ul>
        </Card.Text >
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
</Col>
    <Col sm> <Card style={{ width: '100%', height: '100%' }}>
      <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41%2BfXlXMPyL.jpg" alt="Aloevera Gel"/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text style={{backgroundColor:'black'}}>
         <ul>
           <li>Category-Clothing</li>
           <li>Price</li>
         </ul>
        </Card.Text >
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
</Col>
    <Col sm> <Card style={{ width: '100%', height: '100%' }}>
      <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41%2BfXlXMPyL.jpg" alt="Aloevera Gel"/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text style={{backgroundColor:'black'}}>
         <ul>
           <li>Category-Home</li>
           <li>Price</li>
         </ul>
        </Card.Text >
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
</Col>
  </Row>
</Container>
     
    );
}
export default AllProduct;