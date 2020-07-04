import React  from 'react';
import styles from './ProductDetails.module.css';

const ProductDetails = ({category,price,seller,description})=>{
    return(
      <div className="container-fluid">
      <div className="row">
      <div className={`${styles.leftSection} col-md-4`}>
      <img src="https://images-na.ssl-images-amazon.com/images/I/41%2BfXlXMPyL.jpg" className={`${styles.productImage} card-img-top`} alt="..." />
      </div>
      <div className="col-md-8">
      <div className="row" style={{ display: 'flex', justifyContent: 'space-evenly',columnCount: '3' }}>
<ul>
    <li>Category-{category}</li>
    <li>Price-{price}</li>
    <li>Seller-{seller}</li>
    <li>Description-{description}</li>
</ul>
   </div>
   </div>
   </div>
   </div>
    );
}
export default ProductDetails;