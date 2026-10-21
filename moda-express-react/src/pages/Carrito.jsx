import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function Carrito() {
  const { carrito, eliminarDelCarrito, subtotal, envio, total } = useCart();

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Tu Carrito</h2>
      <div className="row g-4">
        <div className="col-md-8">
          {carrito.length === 0 ? (
            <div className="alert alert-info text-center">
              Tu carrito está vacío. <Link to="/productos">Ir al catálogo</Link>
            </div>
          ) : (
            carrito.map((item, idx) => (
              <div key={`${item.id}-${item.talla}-${idx}`} className="card mb-3 p-3 shadow-sm d-flex flex-row align-items-center justify-content-between">
                <img src={item.imagen} alt={item.nombre} style={{ width: "60px", height: "60px", objectFit: "cover" }} className="rounded border" />
                <div className="ms-3 flex-grow-1">
                  <h5 className="h6 mb-1">{item.nombre}</h5>
                  <p className="small text-muted mb-0">Código: {item.id} | Talla: {item.talla} | Cant: {item.cantidad}</p>
                </div>
                <div className="text-end">
                  <strong className="d-block mb-1">${item.subtotal.toLocaleString("es-CL")}</strong>
                  <button onClick={() => eliminarDelCarrito(item.id, item.talla)} className="btn btn-danger btn-sm">
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>Resumen de compra</h4>
            <div className="d-flex justify-content-between my-2"><span>Subtotal:</span><span>${subtotal.toLocaleString("es-CL")}</span></div>
            <div className="d-flex justify-content-between my-2"><span>Envío:</span><span>${envio.toLocaleString("es-CL")}</span></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3"><span>Total:</span><span>${total.toLocaleString("es-CL")}</span></div>
            <Link to="/pago" className={`btn btn-dark w-100 ${carrito.length === 0 ? "disabled" : ""}`}>
              Continuar al pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}