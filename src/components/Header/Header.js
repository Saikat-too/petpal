// Header components
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Animal Healthcare App</Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/pet-dashboard">Pet Dashboard</Link>
            </li>
            <li>
              <Link to="/vet-dashboard">Vet Dashboard</Link>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button>Sign In</button>
          <button>Register</button>
        </div>
      </div>
    </header>
  );
};

export default Header;