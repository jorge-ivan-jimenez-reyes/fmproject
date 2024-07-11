import React from 'react';
import Sidebar from './Sidebar';

const PrivateLayout = ({ children, username }) => {
  return (
    <div className="flex-container">
      <Sidebar username={username} />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
