import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTOS, obtenerStock } from '../services/productosDB';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCart();
  const { usuario } = useAuth();

  const producto = PRODUCTOS.find((p) => p.id === id) || PRODUCTOS[0];
  const stockDisponible = obtenerStock(producto.id);

  const [talla, setTalla] = useState("M");
  const [cantidad, setCantidad] = useState(1);

  const handleAgregar = () => {
    if (!usuario) {
      alert("Debes iniciar sesión o registrarte para agregar productos al carrito.");
      navigate("/login");
      return;
    }

    const exito = agregarAlCarrito(producto, parseInt(cantidad, 10), talla);
    if (exito) {
      alert("¡Producto agregado al carrito exitosamente!");
      navigate("/carrito");
    } else {
      alert("La cantidad seleccionada supera el stock disponible.");
    }
  };

  return (
    <main className="container my-5">
      <div className="card border-0 shadow p-4">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded border" style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }} />
          </div>
          <div className="col-md-6">
            <span className="badge bg-warning text-dark mb-2">{producto.categoria}</span>
            <h2 className="fw-bold">{producto.nombre}</h2>
            <p className="text-muted">Código: <strong>{producto.id}</strong></p>

            <div className="d-flex align-items-baseline gap-3 mb-3 border-bottom pb-3">
              <strong className="fs-2">${producto.precio.toLocaleString("es-CL")}</strong>
              <span className="text-warning fw-bold">Stock disponible: {stockDisponible} unidades</span>
            </div>

            <p className="text-secondary">{producto.descripcion}</p>

            <div className="row g-3 my-3">
              <div className="col-6">
                <label className="form-label fw-bold">Talla:</label>
                <select className="form-select" value={talla} onChange={(e) => setTalla(e.target.value)}>
                  <option value="S">S - Pequeño</option>
                  <option value="M">M - Mediano</option>
                  <option value="L">L - Grande</option>
                  <option value="XL">XL - Extra Grande</option>
                </select>
              </div>

              <div className="col-6">
                <label className="form-label fw-bold">Cantidad:</label>
                <input
                  type="number"
                  className="form-control"
                  value={cantidad}
                  min="1"
                  max={stockDisponible}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-dark py-2 fw-bold" onClick={handleAgregar} disabled={stockDisponible === 0}>
                {stockDisponible > 0 ? "Agregar al carrito" : "Sin Stock"}
              </button>
              <Link to="/productos" className="btn btn-outline-secondary">← Volver al catálogo</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};