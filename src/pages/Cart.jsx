import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { carrito, eliminarDelCarrito, subtotal, envio, total } = useCart();

  return (
    <main className="container my-5">
      <div className="text-center mb-4">
        <span className="text-warning fw-bold text-uppercase small">MODAEXPRESS</span>
        <h2 className="fw-bold">Tu Carrito</h2>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {carrito.length === 0 ? (
            <div className="bg-white p-4 rounded shadow-sm text-center border">
              <p className="text-muted mb-3">Tu carrito está vacío. ¡Agrega productos desde el catálogo!</p>
              <Link to="/productos" className="btn btn-dark fw-bold">Ir al catálogo</Link>
            </div>
          ) : (
            carrito.map((item, index) => (
              <div className="card mb-3 shadow-sm border-0" key={index}>
                <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <img src={item.imagen} alt={item.nombre} style={{ width: "65px", height: "65px", objectFit: "cover" }} className="rounded border" />
                  <div className="flex-grow-1">
                    <h5 className="mb-1 fw-bold">{item.nombre}</h5>
                    <p className="mb-0 text-muted small">Código: <strong>{item.codigo}</strong> | Talla: <strong>{item.talla}</strong></p>
                    <span className="text-warning fw-bold">${item.precio.toLocaleString("es-CL")} c/u</span>
                  </div>
                  <span className="badge bg-light text-dark border px-3 py-2">Cant: {item.cantidad}</span>
                  <div className="text-end">
                    <strong className="d-block mb-1 fs-5">${item.subtotal.toLocaleString("es-CL")}</strong>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminarDelCarrito(index)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4 bg-white">
            <h4 className="fw-bold mb-3 border-bottom pb-2">Resumen de compra</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString("es-CL")}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Envío estimado</span>
              <span>${envio.toLocaleString("es-CL")}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
              <span>Total a pagar</span>
              <strong className="text-warning">${total.toLocaleString("es-CL")}</strong>
            </div>

            <Link to="/pago" className={`btn btn-dark w-100 py-2 fw-bold mb-2 ${carrito.length === 0 ? 'disabled' : ''}`}>
              Continuar al pago
            </Link>
            <Link to="/productos" className="btn btn-outline-secondary w-100">Seguir comprando</Link>
          </div>
        </div>
      </div>
    </main>
  );
};