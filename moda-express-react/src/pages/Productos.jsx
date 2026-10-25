import { useState, useEffect } from "react";
import { PRODUCTOS, obtenerStock } from "../data/productosDB";
import { ProductCard } from "../components/ProductCard";

export function Productos() {
  const [stocks, setStocks] = useState({});

  useEffect(() => {
    const estadoStocks = {};
    PRODUCTOS.forEach((p) => {
      estadoStocks[p.id] = obtenerStock(p.id);
    });
    setStocks(estadoStocks);
  }, []);

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <span className="text-uppercase text-secondary fw-bold small">MODAEXPRESS</span>
        <h2 className="fw-bold mt-1">Catálogo de Productos</h2>
      </div>
      <div className="row g-4">
        {PRODUCTOS.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            stock={stocks[prod.id]}
          />
        ))}
      </div>
    </div>
  );
}