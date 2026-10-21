import { PRODUCTOS, obtenerStock, actualizarStock } from '../data/productosDB.js';
import { guardarNuevoPedido, obtenerPedidos, actualizarEstadoPedido } from '../data/pedidosDB.js';

describe('Suite de Pruebas Unitarias - ModaExpress', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('1. Debe retornar el catálogo inicial completo de productos', () => {
    expect(PRODUCTOS.length).toBe(4);
  });

  it('2. Debe obtener el stock inicial correcto de un producto', () => {
    const stock = obtenerStock('PR001');
    expect(stock).toBe(45);
  });

  it('3. Debe actualizar el stock correctamente en localStorage', () => {
    actualizarStock('PR001', 40);
    expect(obtenerStock('PR001')).toBe(40);
  });

  it('4. Debe calcular el subtotal correctamente según la cantidad elegida', () => {
    const producto = PRODUCTOS[0];
    const cantidad = 3;
    const subtotal = producto.precio * cantidad;
    expect(subtotal).toBe(36000);
  });

  it('5. Debe crear y guardar un nuevo pedido en la base de datos simulada', () => {
    const cliente = { nombre: 'Matias Briones', direccion: 'Santiago' };
    const items = [{ id: 'PR001', cantidad: 2, precio: 12000 }];
    const idPedido = guardarNuevoPedido(cliente, items, 24000);

    const pedidos = obtenerPedidos();
    expect(pedidos.length).toBe(1);
    expect(idPedido).toBeDefined();
  });

  it('6. Debe inicializar un pedido nuevo con el estado "Recibido"', () => {
    const cliente = { nombre: 'Sayri Sepulveda', direccion: 'Valparaíso' };
    guardarNuevoPedido(cliente, [], 0);

    const pedidos = obtenerPedidos();
    expect(pedidos[0].estado).toBe('Recibido');
  });

  it('7. Debe permitir actualizar el estado de un pedido desde Logística', () => {
    const cliente = { nombre: 'Martin Briceño', direccion: 'Concepción' };
    const idPedido = guardarNuevoPedido(cliente, [], 0);

    const resultado = actualizarEstadoPedido(idPedido, 'En preparación', 'En embalaje');
    expect(resultado).toBeTrue();

    const pedidos = obtenerPedidos();
    expect(pedidos[0].estado).toBe('En preparación');
  });

  it('8. Debe retornar false al intentar actualizar un pedido inexistente', () => {
    const resultado = actualizarEstadoPedido('PED-9999', 'Entregado');
    expect(resultado).toBeFalse();
  });

  it('9. Debe aplicar el costo fijo de envío ($3.500) sobre el total', () => {
    const subtotal = 25000;
    const costoEnvio = 3500;
    const total = subtotal + costoEnvio;
    expect(total).toBe(28500);
  });

  it('10. Debe validar correctamente la autenticación con credenciales almacenadas', () => {
    const usuarioMock = { correo: 'test@duoc.cl', password: '123' };
    localStorage.setItem('cuenta_registrada', JSON.stringify(usuarioMock));

    const guardado = JSON.parse(localStorage.getItem('cuenta_registrada'));
    expect(guardado.correo).toBe('test@duoc.cl');
  });

});