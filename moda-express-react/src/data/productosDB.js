export const PRODUCTOS = [
  {
    id: "PR001",
    nombre: "Polera básica de algodón",
    categoria: "HOMBRE",
    imagen: "/img/Polera.jpg",
    precio: 12000,
    stockInicial: 45,
    descripcion: "Polera confeccionada en 100% algodón suave y transpirable. Corte regular clásico."
  },
  {
    id: "PR002",
    nombre: "Jeans Slim Fit",
    categoria: "HOMBRE",
    imagen: "/img/Jeans.png",
    precio: 25000,
    stockInicial: 30,
    descripcion: "Jeans de corte Slim Fit con mezclilla elástica de alta durabilidad."
  },
  {
    id: "PR003",
    nombre: "Vestido floral",
    categoria: "MUJER",
    imagen: "/img/Vestido.png",
    precio: 35000,
    stockInicial: 20,
    descripcion: "Vestido corto con estampado floral, tela ligera y corte fresco."
  },
  {
    id: "PR004",
    nombre: "Blusa de seda",
    categoria: "MUJER",
    imagen: "/img/Blusa.png",
    precio: 28000,
    stockInicial: 15,
    descripcion: "Blusa elegante de acabado satinado tipo seda. Suave al tacto."
  }
];

export function obtenerStock(idProducto) {
  const stockGuardado = localStorage.getItem("stock_" + idProducto);
  if (stockGuardado !== null) return parseInt(stockGuardado, 10);
  const prod = PRODUCTOS.find((p) => p.id === idProducto);
  return prod ? prod.stockInicial : 0;
}

export function actualizarStock(idProducto, nuevoStock) {
  localStorage.setItem("stock_" + idProducto, nuevoStock.toString());
}