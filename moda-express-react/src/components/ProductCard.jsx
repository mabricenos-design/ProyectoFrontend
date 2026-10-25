import { Link } from "react-router-dom";

export function ProductCard({ product, stock }) {
  const stockDisponible = stock ?? product.stockInicial;

  return (
    <div className="col-12 col-sm-6 col-md-3">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={product.imagen}
          className="card-img-top p-3"
          alt={product.nombre}
          style={{ height: "220px", objectFit: "contain" }}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2 w-auto align-self-start">
            {product.categoria}
          </span>
          <h5 className="card-title h6 text-dark">{product.nombre}</h5>
          <div className="d-flex justify-content-between align-items-center my-2">
            <strong className="fs-5 text-dark">
              ${product.precio.toLocaleString("es-CL")}
            </strong>
            <span className={`badge ${stockDisponible > 0 ? "bg-info text-dark" : "bg-danger"}`}>
              Stock: {stockDisponible}
            </span>
          </div>
          <Link
            to={`/detalle-producto?id=${product.id}`}
            className="btn btn-dark btn-sm mt-auto w-100"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}