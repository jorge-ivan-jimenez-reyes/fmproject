import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in again.');
          setLoading(false);
          return;
        }

        console.log('Token used for request:', token);  // Añadir esto para verificar el token

        const response = await axios.get('http://corte.fymmx.com/plantillas/getData', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setPedidos(response.data);
        } else {
          setError('Failed to fetch pedidos data. Please try again later.');
        }
      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
          setError('No response received from the server. Please try again later.');
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }

      await axios.put(`http://corte.fymmx.com/plantillas/changeStatus?IDpedido=${id}&status=${status}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPedidos((prev) => prev.map(pedido => pedido.id === id ? { ...pedido, status } : pedido));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="mb-4 flex justify-between">
            <div className="text-lg font-bold">Total de Pedidos: {pedidos.length}</div>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Descripción</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className={`bg-${pedido.status === 'Completado' ? 'green-200' : pedido.status === 'Rechazado' ? 'red-200' : 'yellow-200'}`}>
                    <td className="border px-4 py-2">{pedido.id}</td>
                    <td className="border px-4 py-2">{pedido.nombre}</td>
                    <td className="border px-4 py-2">{pedido.descripcion}</td>
                    <td className="border px-4 py-2">
                      <select
                        value={pedido.status}
                        onChange={(e) => handleStatusChange(pedido.id, e.target.value)}
                        className="bg-white border rounded px-2 py-1"
                      >
                        <option value="En espera">En espera</option>
                        <option value="Completado">Completado</option>
                        <option value="Rechazado">Rechazado</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleStatusChange(pedido.id, 'Rechazado')} className="bg-red-500 text-white px-4 py-2 rounded">Rechazar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Pedidos;
