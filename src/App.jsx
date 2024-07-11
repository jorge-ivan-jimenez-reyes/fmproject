import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './components/PrivateLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Pedidos from './pages/Pedidos';
import './index.css';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <Routes>
                  <Route path="/" element={<Pedidos />} />
                  <Route path="/user" element={<div>User</div>} />
                  <Route path="/messages" element={<div>Messages</div>} />
                  <Route path="/analytics" element={<div>Analytics</div>} />
                  <Route path="/file-manager" element={<div>File Manager</div>} />
                  <Route path="/cart" element={<div>Cart</div>} />
                  <Route path="/saved" element={<div>Saved</div>} />
                  <Route path="/setting" element={<div>Setting</div>} />
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
