import React, { useRef } from 'react';
import './App.css';
import HealthyNavbar from './Components/HealthyNavbar';
import topImg from './images/bgimg.webp';
import ImageUpload from './Components/ImageUpload';
import Contact from './Components/Contact';
import AboutUs from './Components/About';

function App() {
  // References for each section
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Pass scrollToSection function and refs to the Navbar */}
      <HealthyNavbar
        onServicesClick={() => scrollToSection(servicesRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
      <header className="App-header">
        <img src={topImg} alt="background" className="header-image" />
        <div className="header-content">
          <h1>DECODE YOUR DIET</h1>
          <button
            className="get-started-btn"
            onClick={() => scrollToSection(servicesRef)}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Assign refs to each section */}
      <div ref={aboutRef}>
        <AboutUs />
      </div>
      <div ref={servicesRef}>
        <ImageUpload />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
    </div>
  );
}

export default App;
