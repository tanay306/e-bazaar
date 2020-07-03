import React from 'react';
import './App.css';
import Login from './component/Login';
import NavbarComponent from './component/Navbar';
import AllProduct from './component/AllProduct';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavbarComponent />
        <AllProduct />
      </header>
    </div>
  );
}

export default App;

