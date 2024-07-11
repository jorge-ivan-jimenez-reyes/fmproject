import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import fondoLogin from '../assets/images/Fondo_Login.jpg';
import logo from '../assets/images/logoazulnegro.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://corte.fymmx.com/token/', { username, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 h-32" />
        <h1 className="mb-8 text-3xl text-white text-center">Login</h1>
        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4 flex items-center bg-gray-700 p-2 rounded">
            <FaUser className="text-white mr-3" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 flex items-center bg-gray-700 p-2 rounded">
            <FaEnvelope className="text-white mr-3" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6 flex items-center bg-gray-700 p-2 rounded">
            <FaLock className="text-white mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
              required
            />
          </div>
          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline w-full"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
