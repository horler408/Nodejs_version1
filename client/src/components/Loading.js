import React from 'react';
// import 'react-loading-skeleton/dist/skeleton.css';
// import Skeleton from 'react-loading-skeleton';
import { Col, Row, Spinner } from 'react-bootstrap';

const Loading = ({ size = 100 }) => {
  return (
    <>
      <Row>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '50vh',
          }}
        >
          <Spinner style={{ width: size, height: size }} animation="border" />
        </div>
      </Row>
      <Row>
        <Col md={3}>
          <div>{/* <Skeleton height={350} /> */}</div>
        </Col>
      </Row>
      {/* <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div> */}
    </>
  );
};

export default Loading;
