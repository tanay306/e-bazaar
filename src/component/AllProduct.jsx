import React,{useEffect,useState} from 'react';
import ProductCard from './ProductCard';
import CategoryView from "./CategoryView";
import styles from './AllProduct.module.css';

const AllProduct = ()=>{
  useEffect(()=>{
  fetch('/all_products',{
    method: 'GET',
    headers: {
      'Content-Type': 'application-json'
}
  })
.then(res=>res.json())
.then((res)=> {
  console.log(res);
setProducts(res.products); 
})
.catch(err=>console.log(err));
  },[]);
 const [products, setProducts] = useState([]);
 console.log(products);
    return(
      <div className="container-fluid">
      <div className="row">
      <div className={`${styles.leftSection} col-md-3`}>
        <CategoryView />
      </div>
      <div className="col-md-9">
      <div className={styles.productCards}>
  {products.map((product) => {console.log(product.price)
    return <div className={styles.singleCard}><ProductCard name={product.title} price={`Rs. ${product.price}`} seller='Apple'/></div>
  })}      
   </div>
   </div>
   </div>
   </div>
    );
}
export default AllProduct;