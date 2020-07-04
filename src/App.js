import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import NavbarComponent from './component/Navbar';
import AllProduct from './component/AllProduct';
import UserProfile from './component/UserProfle';
import Login from './component/Login';
const App = () => {
  return (
    <Router>
      
    <div className="App" style={{ overflowX: 'hidden' }}>
        <NavbarComponent />
        <br /><br />
        <Switch>
      <Route path="/all-products" render={() => <Login />} />
      <Route path="/product/:productId" render={() => <AllProduct />} />
      <Route path="/userProfile" render={() => <UserProfile />} />
      <Route path="/" render={() => <AllProduct />} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
