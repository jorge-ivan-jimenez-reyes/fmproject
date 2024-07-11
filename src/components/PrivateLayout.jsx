import React from 'react';
import Sidebar from './Sidebar';

const PrivateLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="main-content flex-grow p-4">
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
