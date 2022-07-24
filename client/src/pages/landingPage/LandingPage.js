import React, { useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './landingPage.css';

const LandingPage = ({ history }) => {
  //   useEffect(() => {
  //     const userInfo = localStorage.getItem('userInfo');

  //     if (userInfo) {
  //       history.push('/home');
  //     }
  //   }, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to home page</h1>
              <p className="subtitle">A safe page to land your dream job</p>
            </div>
            <div className="buttonContainer"></div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
