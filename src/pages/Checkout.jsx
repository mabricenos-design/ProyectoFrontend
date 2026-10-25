import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Checkout = () => {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito } = useCart();
  const { usuario } = useAuth();

  const [titular, setTitular] = useState(usuario ? usuario.nombre : '');

  const handlePago = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert("No tienes productos en el carrito.");
      return;
    }

    const pedido = {
      idPedido: 'PED-' + Math.floor(1000 + Math.random() * 9000),
      fecha: new Date().toLocaleDateString('es-CL'),
      titular: titular || 'Cliente',
      articulos: carrito,
      estado: 'En preparación'
    };

    localStorage.setItem('ultimo_pedido', JSON.stringify(pedido));
    vaciarCarrito();
    alert('¡Pago realizado con éxito! Redirigiendo a tu pedido...');
    navigate('/estado-pedido');
  };

  return (
    <main className="container my-5" style={{ maxWidth: "550px" }}>
      <div className="card shadow-sm border p-4 bg-white">
        <div className="text-center mb-4">
          <div className="fs-1">💳</div>
          <span className="text-warning fw-bold text-uppercase small">MODAEXPRESS</span>
          <h2 className="fw-bold">Datos de Pago</h2>
        </div>

        <form onSubmit={handlePago}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre en la tarjeta</label>
            <input type="text" className="form-control" value={titular} onChange={(e) => setTitular(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Número de tarjeta</label>
            <input type="text" className="form-control" placeholder="1234 5678 9012 3456" maxLength="19" required />
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="form-label fw-bold">Vencimiento</label>
              <input type="text" className="form-control" placeholder="MM/AA" maxLength="5" required />
            </div>
            <div className="col-6">
              <label className="form-label fw-bold">CVV</label>
              <input type="password" className="form-control" placeholder="123" maxLength="3" required />
            </div>
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2 fw-bold">Confirmar y Pagar</button>
        </form>

        <div className="text-center mt-3">
          <Link to="/carrito" className="text-muted text-decoration-none small">← Volver al carrito</Link>
        </div>
      </div>
    </main>
  );
};