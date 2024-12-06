import React, { useEffect, useState } from 'react';
import "../Style/About.css";
import "../App.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import indians_nutri from '../images/Aboutus_Indians.jpeg';
import samjhega_nutri from '../images/samjhegaInd.jpeg';

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Trigger animation when the section is in view
                }
            },
            { threshold: 0.5 } // Trigger animation when 50% of the element is in view
        );

        const target = document.querySelector('.aboutus-section');
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, []);

    return (
        <section className={`aboutus-section ${isVisible ? 'animate' : ''}`}>
            <Container>
                {/* First Row - Left End */}
                <Row className="d-flex justify-content-start aboutus-row">
                    <Col md={6} className="aboutus-image">
                        <Image
                            src={indians_nutri}
                            alt="Label Samjhega India"
                            className="aboutus-banner-image"
                        />
                    </Col>
                    <Col md={6} className="aboutus-description">
                        <h2 className="aboutus-heading">Our Journey: "Label Samjhega India"</h2>
                        <p className="aboutus-text">
                            Nutri Scan started with the goal of making it easier for people to understand nutritional
                            labels and make healthier choices. While there was a campaign by FoodFarmer called "Label Padhega India",
                            we asked ourselves, do people truly understand how to read labels? That’s when we decided to take it further and
                            create a platform where individuals could easily comprehend food labels and make better health decisions.
                        </p>
                        <p className="aboutus-text">
                            Our web app,  is designed to provide consumers with simple, accessible tools
                            to decode the nutritional information on food labels.
                        </p>
                    </Col>

                </Row>

                {/* Second Row - Right End */}
                <Row className="d-flex justify-content-end aboutus-row">
                    <Col md={6} className="aboutus-description">
                        <h2 className="aboutus-heading">Product Recommendations</h2>
                        <p className="aboutus-text">
                            Nutri Scan not only helps you decode nutritional labels, but it also offers personalized recommendations
                            for healthier products. It goes a step further by providing important dietary information such as whether the product is
                            safe for pregnant individuals, lactose-tolerant, vegan/non-vegan, or contains any allergens like peanuts, dairy, eggs, or tree nuts.
                            Nutri Scan makes it easy to find what works for you. We also help you avoid ingredients that may cause allergies.
                        </p>
                        Whether you're looking for vegan options, lactose-free products, or something that's safe during pregnancy,
                        Nutri Scan makes it easy to find what works for you. We also help you avoid ingredients that may cause allergies,
                        such as eggs, peanuts, dairy, and tree nuts.
                        <p>

                        </p>
                    </Col>
                    <Col md={6} className="aboutus-image">
                        <Image
                            src={samjhega_nutri}
                            alt="Label Samjhega India"
                            className="aboutus-banner-image"
                        />
                    </Col>
                </Row>
                {/* NutriScores Section */}
<div className="aboutus-nutri-scores">
  <h3 className="aboutus-nutri-scores-heading">UNDERSTANDING NUTRISCORES</h3>
  <Row className="aboutus-nutri-scores-row">
    <Col md={2} className="aboutus-nutri-score-card" style={{ backgroundColor: "#2E8B57" }}>
      <h4 className="aboutus-nutri-score-title">A</h4>
      <p className="aboutus-nutri-score-description">
        Excellent quality, supports a balanced diet, low in sugar, salt, and fat.
      </p>
    </Col>
    <Col md={2} className="aboutus-nutri-score-card" style={{ backgroundColor: "#66C466" }}>
      <h4 className="aboutus-nutri-score-title">B</h4>
      <p className="aboutus-nutri-score-description">
        Good quality, slightly room for improvement in sugar or fat content.
      </p>
    </Col>
    <Col md={2} className="aboutus-nutri-score-card" style={{ backgroundColor: "#FFBB33" }}>
      <h4 className="aboutus-nutri-score-title">C</h4>
      <p className="aboutus-nutri-score-description">
        Average quality; moderation advised due to higher sugar, fat, or salt.
      </p>
    </Col>
    <Col md={2} className="aboutus-nutri-score-card" style={{ backgroundColor: "#FF7F00" }}>
      <h4 className="aboutus-nutri-score-title">D</h4>
      <p className="aboutus-nutri-score-description">
        Below average; contains ingredients that may negatively affect health.
      </p>
    </Col>
    <Col md={2} className="aboutus-nutri-score-card" style={{ backgroundColor: "#D32F2F" }}>
      <h4 className="aboutus-nutri-score-title">E</h4>
      <p className="aboutus-nutri-score-description">
        Poor quality, high in sugar, salt, and fats. Consume sparingly.
      </p>
    </Col>
  </Row>
</div>

            </Container>
        </section>
    );
};

export default AboutUs;
