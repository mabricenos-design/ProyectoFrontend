import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PRODUCTOS, obtenerStock, actualizarStock } from '../services/productosDB';

export const Admin = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  // Protección de ruta para que solo ingrese el Administrador
  useEffect(() => {
    if (!usuario || usuario.rol !== 'administrador') {
      alert("Acceso denegado. Se requieren permisos de Administrador.");
      navigate("/login");
    }
  }, [usuario, navigate]);

  // Estado local para los stocks de los productos
  const [stocks, setStocks] = useState(() => {
    const estadoInicial = {};
    PRODUCTOS.forEach((prod) => {
      estadoInicial[prod.id] = obtenerStock(prod.id);
    });
    return estadoInicial;
  });

  const handleStockChange = (id, nuevoStock) => {
    const valor = parseInt(nuevoStock, 10);
    if (!isNaN(valor) && valor >= 0) {
      setStocks((prev) => ({ ...prev, [id]: valor }));
    }
  };

  const handleGuardarStock = (id) => {
    const nuevoStock = stocks[id];
    actualizarStock(id, nuevoStock);
    alert(`Stock del producto ${id} actualizado a ${nuevoStock} unidades.`);
  };

  if (!usuario || usuario.rol !== 'administrador') {
    return null;
  }

  return (
    <main className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="badge bg-warning text-dark mb-1">MÓDULO DE GESTIÓN</span>
          <h2 className="fw-bold m-0">Panel de Administración de Inventario</h2>
        </div>
        <span className="text-muted">Usuario: <strong>{usuario.nombre}</strong></span>
      </div>

      <div className="card shadow-sm border-0 bg-white p-4">
        <h4 className="fw-bold mb-3 border-bottom pb-2">Gestión de Productos y Stock</h4>
        
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Código</th>
                <th>Imagen</th>
                <th>Nombre del Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th style={{ width: "180px" }}>Stock Actual</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTOS.map((prod) => (
                <tr key={prod.id}>
                  <td><strong>{prod.id}</strong></td>
                  <td>
                    <img 
                      src={prod.imagen} 
                      alt={prod.nombre} 
                      style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                      className="rounded border" 
                    />
                  </td>
                  <td className="fw-bold">{prod.nombre}</td>
                  <td><span className="badge bg-secondary">{prod.categoria}</span></td>
                  <td>${prod.precio.toLocaleString("es-CL")}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={stocks[prod.id] !== undefined ? stocks[prod.id] : 0}
                      min="0"
                      onChange={(e) => handleStockChange(prod.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button 
                      className="btn btn-warning btn-sm fw-bold"
                      onClick={() => handleGuardarStock(prod.id)}
                    >
                      Guardar Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};