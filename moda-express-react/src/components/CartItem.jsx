export function CartItem({ item, onEliminar }) {
  return (
    <div className="card mb-3 p-3 shadow-sm d-flex flex-row align-items-center justify-content-between">
      <img
        src={item.imagen}
        alt={item.nombre}
        style={{ width: "65px", height: "65px", objectFit: "cover" }}
        className="rounded border"
      />
      <div className="ms-3 flex-grow-1 text-start">
        <h5 className="h6 mb-1 text-dark">{item.nombre}</h5>
        <p className="small text-muted mb-0">
          Código: {item.id} | Talla: <span className="badge bg-light text-dark border">{item.talla}</span> | Cantidad: {item.cantidad}
        </p>
      </div>
      <div className="text-end">
        <strong className="d-block mb-1 text-dark">
          ${item.subtotal.toLocaleString("es-CL")}
        </strong>
        <button
          onClick={() => onEliminar(item.id, item.talla)}
          className="btn btn-outline-danger btn-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}