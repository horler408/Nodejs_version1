import React, { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './landingPage.css';
import axios from 'axios';

const LandingPage = ({ navigate }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    //     const userInfo = localStorage.getItem('userInfo');
    //     if (userInfo) {
    //       navigate('/home');
    //     }
    const fetchData = async () => {
      const response = await axios.get('/api/v1/products');
      const data = await response.data;
      console.log(data);
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to home page</h1>
              <p className="subtitle">A safe page to land your dream job</p>
              <p>{!data ? 'Loading...' : data.map((data) => data.name)}</p>
            </div>
            <div className="buttonContainer"></div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
