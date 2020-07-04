import React from 'react'; 
import {Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './ProductCard.module.css';
import ProductDetails from './ProductDetails';

const ProductCard = ({image,name,seller,price}) => {
  console.log(image)
      return (
  <>
        <div className="card" style={{width: '100%'}}>
        
          <img src={image || "https://370734-1159544-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/03/Chefman.jpg"} className={`${styles.productImage} card-img-top`} alt="..." width="100px" height="150px"/>
          
          <div className="card-body">
            <h2 className={`${styles.cardTitle} card-title`}><u>{name}</u></h2>
          </div>
          <div className={styles.sellerPriceSection}>
            <p className={`${styles.listGroupItem}`}>Price: {price}</p>
            <p className={`${styles.listGroupItem}`}>Seller: {seller}</p>
            </div>
          <div className={`${styles.cardBody} card-body`}>
          <Link to={`/products/${name}`}><Button variant="outline-primary" size="sm" onClick={ProductDetails}>See Product Details</Button></Link>
          </div>
        </div></>
      );
}
export default ProductCard;