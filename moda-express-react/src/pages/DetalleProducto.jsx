import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { PRODUCTOS, obtenerStock } from "../data/productosDB";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export function DetalleProducto() {
  const [params] = useSearchParams();
  const id = params.get("id") || "PR001";
  const producto = PRODUCTOS.find((p) => p.id === id) || PRODUCTOS[0];

  const stock = obtenerStock(producto.id);
  const [talla, setTalla] = useState("M");
  const [cantidad, setCantidad] = useState(1);

  const { agregarAlCarrito } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const handleAgregar = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos.");
      navigate("/login");
      return;
    }

    const exito = agregarAlCarrito(producto, Number(cantidad), talla);
    if (exito) {
      alert("¡Producto agregado al carrito!");
      navigate("/carrito");
    } else {
      alert("Stock insuficiente.");
    }
  };

  return (
    <div className="container py-4">
      <div className="card p-4 shadow-sm">
        <div className="row g-4">
          <div className="col-md-5">
            <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded border" />
          </div>
          <div className="col-md-7">
            <span className="badge bg-secondary mb-2">{producto.categoria}</span>
            <h2>{producto.nombre}</h2>
            <p className="text-muted small">Código: <strong>{producto.id}</strong></p>
            <div className="h3 text-primary mb-3">${producto.precio.toLocaleString("es-CL")}</div>
            <p className="text-muted">Stock disponible: {stock} unidades</p>
            <p>{producto.descripcion}</p>

            <div className="row g-3 mb-3">
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
                  min="1"
                  max={stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>
            </div>

            <button onClick={handleAgregar} className="btn btn-dark me-2" disabled={stock === 0}>
              Agregar al carrito
            </button>
            <Link to="/productos" className="btn btn-outline-secondary">← Volver al catálogo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}