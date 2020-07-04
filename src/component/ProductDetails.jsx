import React, { Component }  from 'react';
import { useParams } from 'react-router-dom';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import styles from './ProductDetails.module.css';
import {Button} from 'react-bootstrap';

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
                  const {category,price,user_id,description,title}=product;
                  return(
                    <div className="container-fluid">
                    <div className="row">
                    <div className={`${styles.leftSection} col-md-4`}>
                    <img src="https://images-na.ssl-images-amazon.com/images/I/41%2BfXlXMPyL.jpg" className={`${styles.productImage} card-img-top`} alt="..." />
                    </div>
                    <div className="col-md-8">
                    <div className="row" style={{ display: 'block' }}>
                    <h5>Seller-{user_id}</h5><br/>
                    <div className={`${styles.paratext} col-md-8`}>
                    <h3 className={styles.paratextContent}>Name-{title}</h3>
                        <p className={styles.paratextContent}>Description-{description}</p>
                       <p className={styles.paratextContent}> Price-{price}</p>
                  <div><Button className={styles.buttons}variant="primary" onClick={() => this.addToCart(product.id)}>
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
      }
     
            return 'Error in displaying product details'
    }
}
export default ProductDetails;