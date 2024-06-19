// Footer implementation which will be shown in every pages
import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          {/* Add more sections as needed */}
        </div>
        <div className="footer-info">
          <h4>Contact Information</h4>
          <p>Animal Healthcare App</p>
          <p>123 Main Street</p>
          <p>City, State 12345</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@animalhealthcare.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Animal Healthcare App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;