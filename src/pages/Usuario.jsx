import React from 'react';

const Usuario = ({ username }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Usuario: {username}</h1>
    </div>
  );
};

export default Usuario;
