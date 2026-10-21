export function obtenerPedidos() {
  return JSON.parse(localStorage.getItem("pedidos_globales")) || [];
}

export function guardarNuevoPedido(datosCliente, itemsCarrito, total) {
  const pedidos = obtenerPedidos();
  const nuevoId = "PED-" + Math.floor(1000 + Math.random() * 9000);
  const nuevoPedido = {
    id: nuevoId,
    cliente: datosCliente.nombre || "Cliente",
    direccion: datosCliente.direccion || "Dirección no especificada",
    fecha: new Date().toLocaleDateString("es-CL"),
    items: itemsCarrito,
    total: total,
    estado: "Recibido",
    comentario: "Pedido recibido en el sistema."
  };
  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos_globales", JSON.stringify(pedidos));
  return nuevoId;
}

export function actualizarEstadoPedido(idPedido, nuevoEstado, comentario) {
  const pedidos = obtenerPedidos();
  const pedido = pedidos.find((p) => p.id === idPedido);
  if (pedido) {
    pedido.estado = nuevoEstado;
    if (comentario) pedido.comentario = comentario;
    localStorage.setItem("pedidos_globales", JSON.stringify(pedidos));
    return true;
  }
  return false;
}