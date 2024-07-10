import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="flex-container">
        {localStorage.getItem('token') && <Sidebar />}
        <div className={`main-content ${localStorage.getItem('token') ? '' : 'w-full'}`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <div>Dashboard</div>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/user" 
              element={
                <PrivateRoute>
                  <div>User</div>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/messages" 
              element={
                <PrivateRoute>
                  <div>Messages</div>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <PrivateRoute>
                  <div>Analytics</div>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/file-manager" 
              element={
                <PrivateRoute>
                  <div>File Manager</div>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <PrivateRoute>
                  <div>Cart</div>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/saved" 
              element={
                <PrivateRoute>
                  <div>Saved</div>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/setting" 
              element={
                <PrivateRoute>
                  <div>Setting</div>
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
