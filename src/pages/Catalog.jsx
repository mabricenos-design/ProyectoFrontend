import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTOS, obtenerStock } from '../services/productosDB';

export const Catalog = () => {
  return (
    <main className="container my-5">
      <div className="text-center mb-4">
        <span className="text-warning fw-bold text-uppercase small">MODAEXPRESS</span>
        <h2 className="fw-bold">Catálogo de Productos</h2>
      </div>

      <div className="row g-4">
        {PRODUCTOS.map((prod) => {
          const stock = obtenerStock(prod.id);
          return (
            <div className="col-md-6 col-lg-3" key={prod.id}>
              <div className="card h-100 border shadow-sm p-2">
                <img src={prod.imagen} className="card-img-top rounded" alt={prod.nombre} style={{ height: "240px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <span className="text-warning fw-bold small text-uppercase">{prod.categoria}</span>
                    <h5 className="card-title fw-bold my-2">{prod.nombre}</h5>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <strong className="fs-5">${prod.precio.toLocaleString("es-CL")}</strong>
                      <span className="badge bg-light text-dark border">Stock: {stock}</span>
                    </div>
                  </div>
                  <Link to={`/detalle/${prod.id}`} className="btn btn-dark w-100 fw-bold">Ver detalle</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};