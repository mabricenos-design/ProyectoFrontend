import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTOS } from '../services/productosDB';

export const Home = () => {
  return (
    <main className="container my-4">
      {/* Hero Section */}
      <section 
        className="p-5 mb-5 rounded text-white shadow"
        style={{
          background: "linear-gradient(rgba(45, 34, 28, 0.72), rgba(45, 34, 28, 0.82)), url('/img/fondo-algodon.jpg') center/cover no-repeat",
          minHeight: "350px"
        }}
      >
        <div className="col-md-8">
          <span className="badge bg-warning text-dark mb-3 px-3 py-2 fw-bold">NUEVA COLECCIÓN 2026</span>
          <h2 className="display-4 fw-bold">Viste tu estilo</h2>
          <p className="lead fs-5 mb-4">
            Descubre nuestra colección de ropa para hombres, mujeres y niños. Moda moderna, precios accesibles y productos de calidad.
          </p>
          <Link to="/productos" className="btn btn-warning btn-lg fw-bold px-4">Ver productos</Link>
        </div>
      </section>

      {/* Destacados */}
      <section className="bg-white p-4 rounded shadow-sm border mb-5">
        <div className="text-center mb-4">
          <span className="text-warning fw-bold text-uppercase small">MODAEXPRESS</span>
          <h2 className="fw-bold text-dark">Productos destacados</h2>
          <p className="text-muted">Encuentra prendas para cada ocasión y descubre nuestros productos más destacados.</p>
        </div>

        <div className="row g-4">
          {PRODUCTOS.map((prod) => (
            <div className="col-md-6 col-lg-3" key={prod.id}>
              <div className="card h-100 border shadow-sm">
                <img src={prod.imagen} className="card-img-top" alt={prod.nombre} style={{ height: "240px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <div>
                    <span className="text-warning fw-bold small text-uppercase">{prod.categoria}</span>
                    <h5 className="card-title fw-bold my-2">{prod.nombre}</h5>
                  </div>
                  <Link to={`/detalle/${prod.id}`} className="btn btn-dark w-100 fw-bold mt-3">Ver producto</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};