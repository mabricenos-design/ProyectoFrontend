import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function EstadoPedido() {
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const ultimo = JSON.parse(localStorage.getItem("ultimo_pedido"));
    setPedido(ultimo);
  }, []);

  if (!pedido) {
    return (
      <div className="container py-5 text-center">
        <h3>No tienes ningún pedido activo.</h3>
        <Link to="/productos" className="btn btn-dark mt-3">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Estado de tu Pedido</h2>
      <div className="card p-4 shadow-sm">
        <h5>Pedido #{pedido.idPedido}</h5>
        <p><strong>Fecha:</strong> {pedido.fecha}</p>
        <p><strong>Titular:</strong> {pedido.titular}</p>
        <p><strong>Estado:</strong> <span className="badge bg-warning text-dark">{pedido.estado}</span></p>
        <hr />
        <h6>Artículos:</h6>
        <ul>
          {pedido.articulos?.map((art, idx) => (
            <li key={idx}>
              {art.nombre} - Cantidad: {art.cantidad} (Talla {art.talla})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}