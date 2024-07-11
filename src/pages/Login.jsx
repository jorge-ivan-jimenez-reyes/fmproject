import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = ({ setUsername }) => {
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
      const response = await axios.post('http://corte.fymmx.com/token/', { email, password });
      console.log('Token:', response.data.token);  // Añadir esto para verificar el token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', email); // Guardar el email en el localStorage
      setUsername(email); // Actualizar el estado del username
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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/Fondo_Login.jpg)' }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
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
