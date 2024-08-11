import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-heading">About Us</h5>
            <p>We provide the best courts for sports enthusiasts. Book your court now and enjoy an amazing experience!</p>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/home">Home</a></li>
              <li><a href="/courts/courtlist">Courts</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-heading">Contact Us</h5>
            <p>Email: info@greenground.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="footer-copy">&copy; 2024 Green Ground. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
