import React from 'react';
import {Card,ListGroup,ListGroupItem,Button,Row,Col,Container} from 'react-bootstrap';
import ProductCard from './ProductCard';
const AllProduct = ()=>{
    return(
      <div className="row" style={{ display: 'flex', justifyContent: 'space-evenly',columnCount: '3' }}>
  <ProductCard name='HArsh' price='786$' seller='Apple' />
<ProductCard name='HArsh' price='786$' seller='Apple' />
   <ProductCard name='HArsh' price='786$' seller='Apple' />
   </div>
    );
}
export default AllProduct;