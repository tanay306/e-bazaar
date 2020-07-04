import React  from 'react';
import styles from './ProductDetails.module.css';
import {Button} from 'react-bootstrap';

const ProductDetails = ({category,price,seller,description,name})=>{
    return(
      <div className="container-fluid">
      <div className="row">
      <div className={`${styles.leftSection} col-md-4`}>
      <img src="https://images-na.ssl-images-amazon.com/images/I/41%2BfXlXMPyL.jpg" className={`${styles.productImage} card-img-top`} alt="..." />
      </div>
      <div className="col-md-8">
      <div className="row" style={{ display: 'block' }}>
      <h5>Seller-{seller}</h5><br/>
      <div className={`${styles.paratext} col-md-8`}>
      <h3 className={styles.paratextContent}>Name-{name}</h3>
          <p className={styles.paratextContent}>Description-{description}</p>
         <p className={styles.paratextContent}> Price-{price}</p>
    <div><Button className={styles.buttons}variant="primary" type="submit">
        Add to Cart
      </Button> 
    </div>   
      </div>
      
      
   </div>
   </div>
   </div>
   </div>
    );
}
export default ProductDetails;