import React, { useState } from 'react';

const Header = ({ handleSearch, handleFilter, handleView }) => {
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedViews, setSelectedViews] = useState([]);

  const toggleFilter = () => setFilterOpen(!filterOpen);
  const toggleView = () => setViewOpen(!viewOpen);

  const applyFilter = () => {
    handleFilter(selectedFilter, filterValue);
    setFilterOpen(false);
  };

  const handleViewChange = (status) => {
    setSelectedViews((prevViews) => {
      if (prevViews.includes(status)) {
        return prevViews.filter((view) => view !== status);
      } else {
        return [...prevViews, status];
      }
    });
  };

  const applyView = () => {
    handleView(selectedViews);
    setViewOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-4 p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        className="p-2 rounded w-full max-w-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
      />
      <div className="flex items-center space-x-4">
        <button onClick={toggleFilter} className="bg-blue-500 p-2 rounded">Filtro</button>
        <button onClick={toggleView} className="bg-green-500 p-2 rounded">Vista</button>
      </div>
      {filterOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="filter-container bg-gray-800 p-4 rounded-lg shadow-lg z-50 text-white w-96">
            <h2 className="text-lg font-bold mb-4">Filtrar por:</h2>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="p-2 rounded w-full mb-4 bg-gray-700 border border-gray-600 focus:outline-none"
            >
              <option value="">Seleccione un campo</option>
              <option value="CorreoSolicitante">Correo del Solicitante</option>
              <option value="FechaEntrega">Fecha de Entrega</option>
              <option value="PlantaDestino">Planta Destino</option>
              <option value="NumeroPiezas">Número de Piezas</option>
              <option value="TieneOrden">Tiene Orden de Compra</option>
              <option value="OrdenCompra">Orden de Compra</option>
              <option value="Material">Material</option>
              <option value="Espesor">Espesor</option>
              <option value="Alto">Alto</option>
              <option value="Largo">Largo</option>
              <option value="NombreArchivo">Nombre del Archivo</option>
              <option value="IncluyeTope">Incluye Tope</option>
              <option value="CantidadTopes">Cantidad de Topes</option>
              <option value="FechaSolicitud">Fecha y Hora de Solicitud</option>
              <option value="IDpedido">ID</option>
            </select>
            {selectedFilter && (
              <input
                type="text"
                placeholder={`Ingrese ${selectedFilter}`}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="p-2 rounded w-full mb-4 bg-gray-700 border border-gray-600 focus:outline-none text-white"
              />
            )}
            <button onClick={applyFilter} className="bg-blue-500 p-2 rounded w-full mb-2">Aplicar Filtro</button>
            <button onClick={toggleFilter} className="bg-red-500 p-2 rounded w-full">Cerrar</button>
          </div>
        </div>
      )}
      {viewOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="view-container bg-gray-800 p-4 rounded-lg shadow-lg z-50 text-white w-96">
            <h2 className="text-lg font-bold mb-4">Opciones de Vista</h2>
            <button onClick={() => handleViewChange('En espera')} className={`p-2 rounded w-full mb-2 ${selectedViews.includes('En espera') ? 'bg-blue-700' : 'bg-blue-500'}`}>En espera</button>
            <button onClick={() => handleViewChange('En proceso')} className={`p-2 rounded w-full mb-2 ${selectedViews.includes('En proceso') ? 'bg-yellow-700' : 'bg-yellow-500'}`}>En proceso</button>
            <button onClick={() => handleViewChange('Rechazado')} className={`p-2 rounded w-full mb-2 ${selectedViews.includes('Rechazado') ? 'bg-red-700' : 'bg-red-500'}`}>Rechazado</button>
            <button onClick={() => handleViewChange('Completado')} className={`p-2 rounded w-full ${selectedViews.includes('Completado') ? 'bg-green-700' : 'bg-green-500'}`}>Completado</button>
            <button onClick={applyView} className="bg-blue-500 p-2 rounded w-full mt-4">Aplicar Vista</button>
            <button onClick={toggleView} className="bg-red-500 p-2 rounded w-full mt-4">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
