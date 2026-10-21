import { createContext, useContext, useState, useEffect } from "react";
import { actualizarStock, obtenerStock } from "../data/productosDB";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito_compras")) || [];
  });

  useEffect(() => {
    localStorage.setItem("carrito_compras", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1, talla = "M") => {
    const stockDisp = obtenerStock(producto.id);
    if (cantidad > stockDisp) return false;

    actualizarStock(producto.id, stockDisp - cantidad);

    setCarrito((prev) => {
      const idx = prev.findIndex((item) => item.id === producto.id && item.talla === talla);
      if (idx !== -1) {
        const copia = [...prev];
        const nuevaCant = copia[idx].cantidad + cantidad;
        copia[idx] = {
          ...copia[idx],
          cantidad: nuevaCant,
          subtotal: nuevaCant * producto.precio
        };
        return copia;
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          talla: talla,
          cantidad: cantidad,
          subtotal: producto.precio * cantidad
        }
      ];
    });
    return true;
  };

  const eliminarDelCarrito = (id, talla) => {
    const item = carrito.find((i) => i.id === id && i.talla === talla);
    if (item) {
      const stockActual = obtenerStock(id);
      actualizarStock(id, stockActual + item.cantidad);
    }
    setCarrito((prev) => prev.filter((i) => !(i.id === id && i.talla === talla)));
  };

  const vaciarCarrito = () => setCarrito([]);

  const subtotal = carrito.reduce((acc, i) => acc + i.subtotal, 0);
  const envio = subtotal > 0 ? 3500 : 0;
  const total = subtotal + envio;

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        subtotal,
        envio,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);