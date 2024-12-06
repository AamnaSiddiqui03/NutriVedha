import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../App.css';
import logo from '../images/logo1.jpeg';

const HealthyNavbar = ({ onServicesClick, onAboutClick, onContactClick }) => {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            alt="Nutri Scan Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center mx-auto">
            <Nav.Link onClick={onServicesClick} className="mx-5">
              Services
            </Nav.Link>
            <Nav.Link onClick={onAboutClick} className="mx-5">
              About
            </Nav.Link>
            <Nav.Link onClick={onContactClick} className="mx-5">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HealthyNavbar;
