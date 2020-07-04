import React from 'react';
import './App.css';
import NavbarComponent from './component/Navbar';
import AllProduct from './component/AllProduct';
import ProductDetails from "./component/ProductDetails";
const App = () => {
  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
        <NavbarComponent />
        <br /><br />
        <AllProduct />
        <ProductDetails  category='Electronics'price='$786'seller='Apple Inc.'description='An iphone'/>
    </div>
  );
}

export default App;
