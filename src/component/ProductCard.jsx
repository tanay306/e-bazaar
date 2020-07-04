import React from 'react'; 
import { Button } from 'react-bootstrap';
import styles from './ProductCard.module.css';
import ProductDetails from './ProductDetails';

const ProductCard = ({image,name,seller,price,description}) => {
      return (
  <>
        <div className="card" style={{width: '100%'}}>
        
          <img src="https://images-na.ssl-images-amazon.com/images/I/41%2BfXlXMPyL.jpg" className={`${styles.productImage} card-img-top`} alt="..." />
          
          <div className="card-body">
            <h2 className={`${styles.cardTitle} card-title`}>{name}</h2>
            <p>{description}</p>
          </div>
          <div className={styles.sellerPriceSection}>
            <p className={`${styles.listGroupItem} list-group-item`}>Price: {price}</p>
            <p className={`${styles.listGroupItem} list-group-item`}>Seller: {seller}</p>
            </div>
          <div className={`${styles.cardBody} card-body`}>
            <Button variant="outline-primary" size="sm" onClick={ProductDetails}>See Product Details</Button>
          </div>
        </div></>
      );
}
export default ProductCard;