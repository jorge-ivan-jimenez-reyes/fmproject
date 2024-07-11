import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://corte.fymmx.com/plantillas/getData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPedidos(response.data);
      } catch (error) {
        setError('Error fetching pedidos data');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://corte.fymmx.com/plantillas/changeStatus?IDpedido=${id}&status=${newStatus}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPedidos(prevPedidos =>
        prevPedidos.map(pedido =>
          pedido.IDpedido === id ? { ...pedido, status: newStatus } : pedido
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Pedidos</h1>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between">
            <div className="card">
              <h2 className="text-xl">Total Pedidos</h2>
              <p className="text-2xl">{pedidos.length}</p>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full bg-gray-800">
              <thead className="table-header">
                <tr>
                  <th className="px-4 py-2">ID Pedido</th>
                  <th className="px-4 py-2">Correo Solicitante</th>
                  <th className="px-4 py-2">Fecha Entrega</th>
                  <th className="px-4 py-2">Planta Destino</th>
                  <th className="px-4 py-2">Numero Piezas</th>
                  <th className="px-4 py-2">Tiene Orden</th>
                  <th className="px-4 py-2">Orden Compra</th>
                  <th className="px-4 py-2">Material</th>
                  <th className="px-4 py-2">Espesor</th>
                  <th className="px-4 py-2">Alto</th>
                  <th className="px-4 py-2">Largo</th>
                  <th className="px-4 py-2">Nombre Archivo</th>
                  <th className="px-4 py-2">Incluye Tope</th>
                  <th className="px-4 py-2">Cantidad Topes</th>
                  <th className="px-4 py-2">Fecha Solicitud</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.IDpedido} className={`table-row status-${pedido.status.replace(' ', '-').toLowerCase()}`}>
                    <td className="border px-4 py-2">{pedido.IDpedido}</td>
                    <td className="border px-4 py-2">{pedido.CorreoSolicitante}</td>
                    <td className="border px-4 py-2">{pedido.FechaEntrega}</td>
                    <td className="border px-4 py-2">{pedido.PlantaDestino}</td>
                    <td className="border px-4 py-2">{pedido.NumeroPiezas}</td>
                    <td className="border px-4 py-2">{pedido.TieneOrden ? 'Yes' : 'No'}</td>
                    <td className="border px-4 py-2">{pedido.OrdenCompra}</td>
                    <td className="border px-4 py-2">{pedido.Material}</td>
                    <td className="border px-4 py-2">{pedido.Espesor}</td>
                    <td className="border px-4 py-2">{pedido.Alto}</td>
                    <td className="border px-4 py-2">{pedido.Largo}</td>
                    <td className="border px-4 py-2">{pedido.NombreArchivo}</td>
                    <td className="border px-4 py-2">{pedido.IncluyeTope ? 'Yes' : 'No'}</td>
                    <td className="border px-4 py-2">{pedido.CantidadTopes}</td>
                    <td className="border px-4 py-2">{pedido.FechaSolicitud}</td>
                    <td className="border px-4 py-2">
                      <select
                        value={pedido.status}
                        onChange={(e) => handleStatusChange(pedido.IDpedido, e.target.value)}
                        className="bg-gray-200 p-2 rounded"
                      >
                        <option value="En espera">En espera</option>
                        <option value="Completado">Completado</option>
                        <option value="Rechazado">Rechazado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
