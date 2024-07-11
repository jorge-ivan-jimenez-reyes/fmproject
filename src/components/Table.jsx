import React from 'react';

const Table = ({ headers, data, handleStatusChange }) => {
  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.IDpedido} className={`table-row status-${row.status.replace(' ', '-').toLowerCase()}`}>
              <td className="border px-4 py-2">{row.IDpedido}</td>
              <td className="border px-4 py-2">{row.CorreoSolicitante}</td>
              <td className="border px-4 py-2">{row.FechaEntrega}</td>
              <td className="border px-4 py-2">{row.PlantaDestino}</td>
              <td className="border px-4 py-2">{row.NumeroPiezas}</td>
              <td className="border px-4 py-2">{row.TieneOrden ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">{row.OrdenCompra}</td>
              <td className="border px-4 py-2">{row.Material}</td>
              <td className="border px-4 py-2">{row.Espesor}</td>
              <td className="border px-4 py-2">{row.Alto}</td>
              <td className="border px-4 py-2">{row.Largo}</td>
              <td className="border px-4 py-2">{row.NombreArchivo}</td>
              <td className="border px-4 py-2">{row.IncluyeTope ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">{row.CantidadTopes}</td>
              <td className="border px-4 py-2">{row.FechaSolicitud}</td>
              <td className="border px-4 py-2">
                <select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.IDpedido, e.target.value)}
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
  );
};

export default Table;
