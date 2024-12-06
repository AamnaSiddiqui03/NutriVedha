import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import '../App.css';

function Contact() {
  return (
    <>
    <div className="container mt-5" style={{ marginBottom: '100px' }}>
      <h1 className="text-center Sub-Heading">Contact Us</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="list-group">
            <a href="mailto:example@example.com" className="list-group-item list-group-item-action">
              <h5>Email</h5>
              <p>alaka@nutrivedha.com</p>
            </a>
            <a href="tel:+1234567890" className="list-group-item list-group-item-action">
              <h5>Phone Number</h5>
              <p>+91 9830789333</p>
            </a>
            <a href="https://www.instagram.com/aamna_7620" target="_blank" rel="noopener noreferrer" className="list-group-item list-group-item-action">
              <h5>Instagram</h5>
              <p>@Nutrivedha</p>
            </a>
          </div>
        </div>
      </div>
    </div>


    <footer className="footer bg-black text-white text-center py-4">
      <p>&copy; 2024 Nutrivedha. All rights reserved.</p>
    </footer>

    </>
  );
}

export default Contact;
