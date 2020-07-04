import React from 'react';
import './App.css';
import NavbarComponent from './component/Navbar';
import AllProduct from './component/AllProduct';
const App = () => {
  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
        <NavbarComponent />
        <br /><br />
        <AllProduct />
    </div>
  );
}

export default App;
