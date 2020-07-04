import React, { Component }  from 'react';
import { useParams } from 'react-router-dom';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import styles from './ProductDetails.module.css';
import {Button,Card} from 'react-bootstrap';

class ProductDetails extends Component{
    constructor(props) {
        super(props);
        this.state = { product: null };
    }
    componentDidMount() {
        const productTitle = get(this.props, 'match.params.title', null);
        console.log(this.props.match.params)
        if (productTitle) {
            fetch(`/products/${productTitle}`, 
            {
                method: 'GET',
                headers: {
                  'Content-Type': 'application-json'
            }
              })
            .then(res=>res.json())
            .then((res)=> {
              console.log(res);
            this.setState({ product: res.details[0]}); 
            })
            .catch(err=>console.log(err));
        } else {
            console.log('some error occured')
        }
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            const productTitle = get(this.props, 'match.params.title', null);
            if (productTitle) {
                fetch(`/products/${productTitle}`, 
                {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application-json'
                }
                  })
                .then(res=>res.json())
                .then((res)=> {
                  console.log(res);
                this.setState({ product: res.details[0]}); 
                })
                .catch(err=>console.log(err));
            } else {
                console.log('some error occured')
            }
        }

    }

    addToCart(id) {
        fetch(`/add_cart/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    render() {
        const { product } = this.state;
        console.log(this.props)
        const productTitle = get(this.props, 'match.params.title', null);
            if (productTitle) {
       
        
                console.log(product)
                if (product) {
                  const {category,price,user_id,description,title,img,colour,size,disc_price}=product;
                  return(
                    <div className="container">
                    <Card className="mt-3 mb-3">
                    <div className="row">
                    <div className={`${styles.leftSection} col-md-7 mt-4`}>
                    <img src={img || "https://370734-1159544-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/03/Chefman.jpg"} className={`${styles.productImage} card-img-top`} alt="..." />
                    </div>
                    <div className="col-md-5">
                    <div className="row" style={{ display: 'block' }}>
                    <div className={`${styles.paratext} col-md-8 mt-3 mb-3`}>
                    <h4 className={`${styles.paratextContent} text-center text-dark`}>Seller-{user_id}</h4>
                    <h4 className={`${styles.paratextContent} text-center text-dark`}>Name : {title}</h4>
                    <h4 className={`${styles.paratextContent} text-center text-dark`}>Description : {description}</h4>
                    <h4 className={`${styles.paratextContent} text-center text-dark`}>Colour : {colour}</h4>
                    <h4 className={`${styles.paratextContent} text-center text-dark`}> Price : {price}</h4>
                    <h4 className={`${styles.paratextContent} text-center text-dark`}> New Price : {disc_price}</h4>
                    <h4 className={`${styles.paratextContent} text-center text-dark`}> Size : {size}</h4>
                    <div>
                      <Button className={styles.buttons} variant="primary" onClick={() => this.addToCart(product.id)}>
                        Add to Cart
                      </Button> 
                    </div>
                    <h4 className={`${styles.paratextContent} text-center text-dark`}>Reviews:</h4>  
                    <h6 className={`${styles.paratextContent} text-center text-dark`}>Azim Premji: Very good quality,perfect fitting.100% satisfied.</h6>  
                    </div>
                    
                    
                 </div>
                 </div>
                 </div>
                 </Card>
                 </div>
                  );
                }
      }
     
            return 'Error in displaying product details'
    }
}
export default ProductDetails;