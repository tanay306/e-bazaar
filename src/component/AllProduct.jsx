import React from 'react';
import ProductCard from './ProductCard';
import CategoryView from "./CategoryView";
import styles from './AllProduct.module.css';

const AllProduct = ()=>{
    return(
      <div className="container-fluid">
      <div className="row">
      <div className={`${styles.leftSection} col-md-3`}>
        <CategoryView />
      </div>
      <div className="col-md-9">
      <div className="row" style={{ display: 'flex', justifyContent: 'space-evenly',columnCount: '3' }}>
  <ProductCard name='Varun' price='786$' seller='Apple' />
<ProductCard name='Tanay' price='786$' seller='Apple' />
   <ProductCard name='Yash' price='786$' seller='Apple' />
   </div>
   </div>
   </div>
   </div>
    );
}
export default AllProduct;