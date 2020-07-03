import React from 'react'; 
import styles from './ProductCard.module.css';
const ProductCard = ({image,name,seller,price,description}) => {
      return (
  <>
        <div className="card" style={{width: '25%'}}>
        
          <img src="https://images-na.ssl-images-amazon.com/images/I/41%2BfXlXMPyL.jpg" className={`${styles.productImage} card-img-top`} alt="..." />
          
          <div className="card-body">
            <h2 className={`${styles.cardTitle} card-title`}>{name}</h2>
            <p>{description}</p>
          </div>
          <div className={styles.sellerPriceSection}>
            <p className={`${styles.listGroupItem} list-group-item`}>Price: {price}</p>
            <p className={`${styles.listGroupItem} list-group-item`}>Seller: {seller}</p>
            </div>
          {/* <div className="card-body">
            <button variant="primary">Add to cart <i className="fa fa-shopping-cart" aria-hidden="true" style={{ color: 'black' }}></i></button>
            <button className="card-link">Buy now</button>
          </div> */}
        </div></>
      );
}
export default ProductCard;