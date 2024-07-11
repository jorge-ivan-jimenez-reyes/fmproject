import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import fondoLogin from '../assets/images/Fondo_Login.jpg';
import logo from '../assets/images/logoazulnegro.jpg';

const Login = ({ setUsername }) => {
  const [username, setUsernameState] = useState('');
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
      console.log('Response:', response.data); // Verificar la respuesta completa
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('username', username); // Guardar el username en el localStorage
      setUsername(username); // Actualizar el estado del username
      console.log('Token saved in localStorage:', localStorage.getItem('access_token'));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error); // Mostrar el error completo
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else if (error.response && error.response.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${fondoLogin})` }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 relative">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 h-32" />
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsernameState(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded mt-1"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded mt-1"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded mt-1"
              placeholder="Password"
              required
            />
          </div>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div> Loading...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
