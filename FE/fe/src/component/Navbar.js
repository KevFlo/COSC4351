// creating a navbar
import React from 'react';
import './Navbar.css';
// import { Link } from 'react-router-dom';

function butClick(){
    alert('You clicked a button!')
  }

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <ul>
        <li><button className="nav-button" onClick={butClick}>Reservation</button></li>
        <li><button className="nav-button" onClick={butClick}>Register</button></li>
        <li><button className="nav-button" onClick={butClick}>Login</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
