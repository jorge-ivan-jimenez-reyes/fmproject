import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fondoLogin from '../assets/images/Fondo_Login.jpg';
import logo from '../assets/images/logoazulnegro.jpg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://corte.fymmx.com/register/', { username, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);
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
      <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 h-32" />
        <h1 className="mb-8 text-3xl text-white text-center">Register</h1>
        <form onSubmit={handleRegister} className="w-full">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-white">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
              {loading ? 'Loading...' : 'Register'}
            </button>
          </div>
          {loading && (
            <div className="mt-4">
              <div className="loader">Loading...</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
