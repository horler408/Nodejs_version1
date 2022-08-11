import React from 'react';
import { Row, Container, Button } from 'react-bootstrap';

import './landingPage.css';

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to home page</h1>
              <p className="subtitle">A safe page to land your dream job</p>
            </div>
            <div className="button-container">
              <a href="/login">
                <Button size="lg" className="landing-button">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landing-button"
                  variant="outline-primary"
                >
                  Register
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
