import React from 'react'; 
const ProductCard = () => {
      return (
  <>
        <div className="card" style={{width: '18rem'}}>
          <img src="images/one.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Mens Tshirt</h5>
            <p>Men Printed Casual Spread Shirt</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">₹599</li>
            <li className="list-group-item">In stock</li>
          </ul>
          <div className="card-body">
            <a href="#" className="card-link">Add to cart</a>
            <a href="#" className="card-link">Buy now</a>
          </div>
        </div></>
      );
}
export default ProductCard;