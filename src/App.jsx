import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './components/PrivateLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Pedidos from './pages/Pedidos';
import Usuario from './pages/Usuario';
import './index.css';

const App = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Obtener el username del localStorage u otra fuente después del login
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <PrivateLayout username={username}>
                <Routes>
                  <Route path="/" element={<Pedidos />} />
                  <Route path="/usuario" element={<Usuario username={username} />} />
                  <Route path="/logout" element={<div>Logging out...</div>} />
                </Routes>
              </PrivateLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
