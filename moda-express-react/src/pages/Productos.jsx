import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PRODUCTOS, obtenerStock } from "../data/productosDB";

export function Productos() {
  const [stocks, setStocks] = useState({});

  useEffect(() => {
    const estadoStocks = {};
    PRODUCTOS.forEach((p) => {
      estadoStocks[p.id] = obtenerStock(p.id);
    });
    setStocks(estadoStocks);
  }, []);

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <span className="text-uppercase text-secondary fw-bold small">MODAEXPRESS</span>
        <h2>Catálogo de Productos</h2>
      </div>
      <div className="row g-4">
        {PRODUCTOS.map((prod) => (
          <div key={prod.id} className="col-12 col-sm-6 col-md-3">
            <div className="card h-100 shadow-sm">
              <img src={prod.imagen} className="card-img-top p-2" alt={prod.nombre} style={{ height: "220px", objectFit: "contain" }} />
              <div className="card-body d-flex flex-column">
                <span className="badge bg-secondary mb-2 w-auto">{prod.categoria}</span>
                <h5 className="card-title h6">{prod.nombre}</h5>
                <div className="d-flex justify-content-between align-items-center my-2">
                  <strong className="fs-5">${prod.precio.toLocaleString("es-CL")}</strong>
                  <span className="badge bg-info text-dark">Stock: {stocks[prod.id] ?? prod.stockInicial}</span>
                </div>
                <Link to={`/detalle-producto?id=${prod.id}`} className="btn btn-dark btn-sm mt-auto">
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}