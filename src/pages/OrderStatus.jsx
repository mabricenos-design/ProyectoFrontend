import React from 'react';
import { Link } from 'react-router-dom';

export const OrderStatus = () => {
  const pedido = JSON.parse(localStorage.getItem("ultimo_pedido"));

  if (!pedido || !pedido.articulos || pedido.articulos.length === 0) {
    return (
      <main className="container my-5 text-center">
        <div className="card p-5 shadow-sm border-0">
          <p className="fs-5 text-muted">No tienes ningún pedido activo en este momento.</p>
          <div>
            <Link to="/productos" className="btn btn-dark fw-bold">Ir al catálogo</Link>
          </div>
        </div>
      </main>
    );
  }

  const subtotal = pedido.articulos.reduce((acc, item) => acc + item.subtotal, 0);
  const envio = 3000;
  const total = subtotal + envio;

  return (
    <main className="container my-5">
      <div className="text-center mb-4">
        <div className="fs-1">📦</div>
        <h2 className="fw-bold">Estado de tu Pedido</h2>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card p-4 shadow-sm border-0 mb-3 bg-light">
            <p className="mb-1"><strong>N° Pedido:</strong> {pedido.idPedido}</p>
            <p className="mb-1"><strong>Fecha de compra:</strong> {pedido.fecha}</p>
            <p className="mb-1"><strong>Cliente:</strong> {pedido.titular}</p>
            <p className="mb-0"><strong>Estado:</strong> <span className="badge bg-warning text-dark">{pedido.estado}</span></p>
          </div>

          <div className="card p-4 shadow-sm border-0">
            <h5 className="fw-bold mb-3">Prendas compradas</h5>
            {pedido.articulos.map((item, idx) => (
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom" key={idx}>
                <div className="d-flex align-items-center gap-3">
                  <img src={item.imagen} alt={item.nombre} style={{ width: "50px", height: "50px", objectFit: "cover" }} className="rounded border" />
                  <div>
                    <strong>{item.nombre}</strong>
                    <p className="text-muted small mb-0">Talla: {item.talla} | Cantidad: {item.cantidad}</p>
                  </div>
                </div>
                <strong>${item.subtotal.toLocaleString("es-CL")}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-4 shadow-sm border-0">
            <h4 className="fw-bold mb-3 border-bottom pb-2">Total pagado</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString("es-CL")}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Envío</span>
              <span>${envio.toLocaleString("es-CL")}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
              <span>Total final</span>
              <strong className="text-warning">${total.toLocaleString("es-CL")}</strong>
            </div>
            <Link to="/productos" className="btn btn-dark w-100 fw-bold">Seguir comprando</Link>
          </div>
        </div>
      </div>
    </main>
  );
};