import React from "react";

const SucursalModal = ({ isOpen, onClose, sucursales, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Seleccionar Sucursal</h2>
        <div className="space-y-3">
          {sucursales.map((sucursal) => (
            <button
              key={sucursal._id}
              onClick={() => onSelect(sucursal._id)}
              className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sucursal.nombre}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default SucursalModal;
