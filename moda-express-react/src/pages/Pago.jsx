import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { guardarNuevoPedido } from "../data/pedidosDB";

export function Pago() {
  const { carrito, total, vaciarCarrito } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [titular, setTitular] = useState(usuario ? usuario.nombre : "");
  const [direccion, setDireccion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carrito.length === 0) return;

    const datosCliente = { nombre: titular, direccion: direccion };
    const nuevoId = guardarNuevoPedido(datosCliente, carrito, total);

    localStorage.setItem(
      "ultimo_pedido",
      JSON.stringify({
        idPedido: nuevoId,
        fecha: new Date().toLocaleDateString("es-CL"),
        titular: titular,
        articulos: carrito,
        estado: "En preparación"
      })
    );

    vaciarCarrito();
    alert("¡Pago realizado con éxito!");
    navigate("/estado-pedido");
  };

  return (
    <div className="container py-4" style={{ maxWidth: "500px" }}>
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-3">Datos de Pago</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre Titular:</label>
            <input type="text" className="form-control" required value={titular} onChange={(e) => setTitular(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Dirección de Despacho:</label>
            <input type="text" className="form-control" required value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Número de Tarjeta:</label>
            <input type="text" className="form-control" maxLength="19" placeholder="1234 5678 9012 3456" required />
          </div>
          <button type="submit" className="btn btn-dark w-100">Confirmar y Pagar (${total.toLocaleString("es-CL")})</button>
        </form>
      </div>
    </div>
  );
}