import React from 'react';

const Table = ({ headers, data, handleStatusChange }) => {
  return (
    <div className="overflow-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.IDpedido} className={`table-row status-${row.status.replace(' ', '-').toLowerCase()}`}>
              <td className="border-t border-gray-200 px-4 py-3">{row.IDpedido}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.CorreoSolicitante}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.FechaEntrega}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.PlantaDestino}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.NumeroPiezas}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.TieneOrden ? 'Sí' : 'No'}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.OrdenCompra}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.Material}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.Espesor}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.Alto}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.Largo}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.NombreArchivo}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.IncluyeTope ? 'Sí' : 'No'}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.CantidadTopes}</td>
              <td className="border-t border-gray-200 px-4 py-3">{row.FechaSolicitud}</td>
              <td className="border-t border-gray-200 px-4 py-3">
                <select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.IDpedido, e.target.value)}
                  className="bg-gray-200 p-2 rounded"
                >
                  <option value="En espera">En espera</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Completado">Completado</option>
                  <option value="Rechazado">Rechazado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
