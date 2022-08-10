import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    <div className="App">
      <p>
        You have logged out successfully. Return to <Link to="/">Home</Link>{' '}
        page
      </p>
    </div>
  );
};

export default Logout;
