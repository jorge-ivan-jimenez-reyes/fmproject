import React from 'react';
import Sidebar from './Sidebar';

const PrivateLayout = ({ children }) => {
  const username = localStorage.getItem('username');
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
