import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import '../App.css';

function Contact() {
  return (
    <>
      <div className="container mt-5" style={{ marginBottom: '100px' }}>
        <h1 className="text-center Sub-Heading">Contact Us</h1>
        
        <div className="row justify-content-center">
          <div className="col-md-5">
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

          <div className="col-md-7">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.086019277937!2d77.51371107792978!3d12.902190154936143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fa7243af9c3%3A0x9bed6669a38d1c3!2sRNS%20INSTITUTE%20OF%20TECHNOLOGY!5e0!3m2!1sen!2ssa!4v1734051756985!5m2!1sen!2ssa"
              width="100%" 
              height="266" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Map Location of RNS Institute of Technology"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
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
