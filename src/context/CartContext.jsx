import React, { createContext, useContext, useState, useEffect } from 'react';
import { obtenerStock, actualizarStock } from '../services/productosDB';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito_compras");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito_compras", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad, talla) => {
    const stockActual = obtenerStock(producto.id);

    if (cantidad <= stockActual && cantidad > 0) {
      actualizarStock(producto.id, stockActual - cantidad);

      setCarrito((prev) => {
        const indexExistente = prev.findIndex(
          (item) => item.codigo === producto.id && item.talla === talla
        );

        if (indexExistente > -1) {
          const copia = [...prev];
          copia[indexExistente].cantidad += cantidad;
          copia[indexExistente].subtotal = copia[indexExistente].cantidad * producto.precio;
          return copia;
        }

        return [
          ...prev,
          {
            codigo: producto.id,
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio: producto.precio,
            talla: talla,
            cantidad: cantidad,
            subtotal: producto.precio * cantidad
          }
        ];
      });
      return true;
    }
    return false;
  };

  const eliminarDelCarrito = (index) => {
    const itemEliminado = carrito[index];
    if (itemEliminado) {
      const stockActual = obtenerStock(itemEliminado.codigo);
      actualizarStock(itemEliminado.codigo, stockActual + itemEliminado.cantidad);

      setCarrito((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.subtotal, 0);
  const envio = carrito.length > 0 ? 3500 : 0;
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
};

export const useCart = () => useContext(CartContext);