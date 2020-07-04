import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import NavbarComponent from './component/Navbar';
import AllProduct from './component/AllProduct';
import ProductDetails from "./component/ProductDetails";
import UserProfile from './component/UserProfle';
import Login from './component/Login';
import UserCart from './component/UserCart';
import manageProduct from './component/ManageProduct';

const App = () => {
  return (
    <Router>
      
    <div className="App" style={{ overflowX: 'hidden' }}>
        <NavbarComponent />
        <br /><br />
        {/* <ProductDetails  category='Electronics'price='$786'seller='Apple Inc.'name='An iphone'description='Camera-12mpx */}
        {/* RAM-64GB'/> */}
        <Switch>
      <Route path="/all-products" render={() => <Login />} />
      <Route path="/products/:title" component={ProductDetails} />
      <Route path="/userProfile" render={() => <UserProfile />} />
      <Route path="/myCart" render={() => <UserCart />} />
      <Route path="/edit_items/:title" component={manageProduct} />
      <Route path="/" render={() => <AllProduct />} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
