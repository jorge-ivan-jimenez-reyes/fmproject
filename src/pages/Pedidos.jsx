import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';

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

  const headers = [
    "ID Pedido", "Correo Solicitante", "Fecha Entrega", "Planta Destino", "Numero Piezas",
    "Tiene Orden", "Orden Compra", "Material", "Espesor", "Alto", "Largo", "Nombre Archivo",
    "Incluye Tope", "Cantidad Topes", "Fecha Solicitud", "Status"
  ];

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
          <Table headers={headers} data={pedidos} handleStatusChange={handleStatusChange} />
        </div>
      )}
    </div>
  );
};

export default Pedidos;
