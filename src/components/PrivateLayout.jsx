import React from 'react';
import Sidebar from './Sidebar';

const PrivateLayout = ({ children }) => {
  return (
    <div className="flex-container">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
