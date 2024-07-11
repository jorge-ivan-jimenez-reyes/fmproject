import React from 'react';
import Sidebar from './Sidebar';

const PrivateLayout = ({ children, username }) => {
  return (
    <div className="flex">
      <Sidebar username={username} />
      <div className="main-content flex-grow p-4">
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
