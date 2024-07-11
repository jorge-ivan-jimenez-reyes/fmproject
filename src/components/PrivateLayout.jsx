import React from 'react';
import Sidebar from './Sidebar';

const PrivateLayout = ({ username, children }) => {
  return (
    <div className="flex">
      <Sidebar username={username} />
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
