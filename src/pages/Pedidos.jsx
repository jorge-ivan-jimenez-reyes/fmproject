import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Header from '../components/Header';
import { FaClipboardList, FaHourglassHalf, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedViews, setSelectedViews] = useState([]);
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
        setFilteredPedidos(response.data);
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
      setFilteredPedidos(prevPedidos =>
        prevPedidos.map(pedido =>
          pedido.IDpedido === id ? { ...pedido, status: newStatus } : pedido
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = pedidos.filter(pedido =>
      Object.values(pedido).some(value =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredPedidos(filtered);
  };

  const handleFilter = (field, value) => {
    const filtered = pedidos.filter(pedido =>
      String(pedido[field]).toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPedidos(filtered);
  };

  const handleViewChange = (selectedView) => {
    setSelectedViews(selectedView);
  };

  const headers = [
    "ID Pedido", "Correo Solicitante", "Fecha Entrega", "Planta Destino", "Numero Piezas",
    "Tiene Orden", "Orden Compra", "Material", "Espesor", "Alto", "Largo", "Nombre Archivo",
    "Incluye Tope", "Cantidad Topes", "Fecha Solicitud", "Status"
  ];

  const countByStatus = (status) => pedidos.filter(pedido => pedido.status === status).length;

  return (
    <div className="p-4">
      <Header handleSearch={handleSearch} handleFilter={handleFilter} handleView={handleViewChange} />
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Pedidos</h1>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card bg-blue-500 text-white p-4 rounded shadow-md flex items-center">
              <FaClipboardList className="text-3xl mr-4 icon" />
              <div>
                <h2 className="text-xl">Total Pedidos</h2>
                <p className="text-3xl font-bold">{filteredPedidos.length}</p>
              </div>
            </div>
            <div className="card bg-yellow-500 text-white p-4 rounded shadow-md flex items-center">
              <FaHourglassHalf className="text-3xl mr-4 icon" />
              <div>
                <h2 className="text-xl">En Proceso</h2>
                <p className="text-3xl font-bold">{countByStatus('En proceso')}</p>
              </div>
            </div>
            <div className="card bg-red-500 text-white p-4 rounded shadow-md flex items-center">
              <FaTimesCircle className="text-3xl mr-4 icon" />
              <div>
                <h2 className="text-xl">Rechazados</h2>
                <p className="text-3xl font-bold">{countByStatus('Rechazado')}</p>
              </div>
            </div>
            <div className="card bg-green-500 text-white p-4 rounded shadow-md flex items-center">
              <FaCheckCircle className="text-3xl mr-4 icon" />
              <div>
                <h2 className="text-xl">Listos</h2>
                <p className="text-3xl font-bold">{countByStatus('Completado')}</p>
              </div>
            </div>
          </div>
          {selectedViews.length === 0 ? (
            <Table headers={headers} data={filteredPedidos} handleStatusChange={handleStatusChange} />
          ) : (
            <div className="space-y-8">
              {selectedViews.includes('En espera') && (
                <div>
                  <h2 className="text-xl font-bold mb-2 text-gray-800">En Espera</h2>
                  <Table headers={headers} data={filteredPedidos.filter(pedido => pedido.status === 'En espera')} handleStatusChange={handleStatusChange} />
                </div>
              )}
              {selectedViews.includes('En proceso') && (
                <div>
                  <h2 className="text-xl font-bold mb-2 text-gray-800">En Proceso</h2>
                  <Table headers={headers} data={filteredPedidos.filter(pedido => pedido.status === 'En proceso')} handleStatusChange={handleStatusChange} />
                </div>
              )}
              {selectedViews.includes('Rechazado') && (
                <div>
                  <h2 className="text-xl font-bold mb-2 text-gray-800">Rechazados</h2>
                  <Table headers={headers} data={filteredPedidos.filter(pedido => pedido.status === 'Rechazado')} handleStatusChange={handleStatusChange} />
                </div>
              )}
              {selectedViews.includes('Completado') && (
                <div>
                  <h2 className="text-xl font-bold mb-2 text-gray-800">Completados</h2>
                  <Table headers={headers} data={filteredPedidos.filter(pedido => pedido.status === 'Completado')} handleStatusChange={handleStatusChange} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pedidos;
