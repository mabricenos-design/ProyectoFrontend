import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../components/CartItem";

export function Carrito() {
  const { carrito, eliminarDelCarrito, subtotal, envio, total } = useCart();

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">Tu Carrito de Compras</h2>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {carrito.length === 0 ? (
            <div className="alert alert-info text-center py-4">
              <p className="mb-2">Tu carrito está actualmente vacío.</p>
              <Link to="/productos" className="btn btn-primary btn-sm">
                Ir al catálogo
              </Link>
            </div>
          ) : (
            carrito.map((item, idx) => (
              <CartItem
                key={`${item.id}-${item.talla}-${idx}`}
                item={item}
                onEliminar={eliminarDelCarrito}
              />
            ))
          )}
        </div>
        <div className="col-12 col-lg-4">
          <div className="card p-3 shadow-sm border-0">
            <h4 className="h5 fw-bold mb-3">Resumen de compra</h4>
            <div className="d-flex justify-content-between my-2 text-muted">
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString("es-CL")}</span>
            </div>
            <div className="d-flex justify-content-between my-2 text-muted">
              <span>Envío:</span>
              <span>${envio.toLocaleString("es-CL")}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3 text-dark">
              <span>Total:</span>
              <span>${total.toLocaleString("es-CL")}</span>
            </div>
            <Link
              to="/pago"
              className={`btn btn-dark w-100 ${carrito.length === 0 ? "disabled" : ""}`}
            >
              Continuar al pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}