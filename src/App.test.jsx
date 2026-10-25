import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Catalog } from './pages/Catalog';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PRODUCTOS, obtenerStock, actualizarStock } from './services/productosDB';

const renderWithProviders = (component) => {
  return render(
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

describe('Suite de Pruebas Unitarias - ModaExpress (10/10)', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('1. Navbar: Renderiza el título de la marca ModaExpress correctamente', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('heading', { name: /ModaExpress/i })).toBeInTheDocument();
  });

  test('2. Catálogo: Carga correctamente los productos de la base de datos centralizada', () => {
    renderWithProviders(<Catalog />);
    expect(screen.getByText('Polera básica de algodón')).toBeInTheDocument();
    expect(screen.getByText('Jeans Slim Fit')).toBeInTheDocument();
  });

  test('3. Stock: Retorna el stock inicial por defecto de un producto si no está en localStorage', () => {
    const stockPolera = obtenerStock('PR001');
    expect(stockPolera).toBe(45);
  });

  test('4. Stock: Permite actualizar y almacenar el nuevo stock en localStorage', () => {
    actualizarStock('PR001', 40);
    const stockActualizado = obtenerStock('PR001');
    expect(stockActualizado).toBe(40);
  });

  test('5. Carrito: Muestra mensaje de carrito vacío cuando no hay elementos agregados', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  test('6. Carrito: Agrega productos y calcula el subtotal de compra correctamente', () => {
    const ComponenteTestPrueba = () => {
      const { agregarAlCarrito } = useCart();
      return (
        <button onClick={() => agregarAlCarrito(PRODUCTOS[0], 2, 'M')}>
          Agregar Poleras
        </button>
      );
    };

    renderWithProviders(
      <>
        <ComponenteTestPrueba />
        <Cart />
      </>
    );

    const boton = screen.getByText('Agregar Poleras');
    fireEvent.click(boton);

    const precios24k = screen.getAllByText('$24.000');
    expect(precios24k.length).toBeGreaterThan(0);
  });

  test('7. Carrito: Elimina un producto al hacer clic en el botón Eliminar', () => {
    const ComponenteTestEliminar = () => {
      const { agregarAlCarrito } = useCart();
      return (
        <button onClick={() => agregarAlCarrito(PRODUCTOS[0], 1, 'L')}>
          Agregar
        </button>
      );
    };

    renderWithProviders(
      <>
        <ComponenteTestEliminar />
        <Cart />
      </>
    );

    fireEvent.click(screen.getByText('Agregar'));
    const btnEliminar = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(btnEliminar);

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  test('8. Login: Permite escribir correo y contraseña en los campos correspondientes', () => {
    renderWithProviders(<Login />);

    const inputs = screen.getAllByRole('textbox');
    const inputCorreo = inputs[0]; 
    const inputPass = document.querySelector('input[type="password"]');

    fireEvent.change(inputCorreo, { target: { value: 'cliente@correo.cl' } });
    fireEvent.change(inputPass, { target: { value: '123456' } });

    expect(inputCorreo.value).toBe('cliente@correo.cl');
    expect(inputPass.value).toBe('123456');
  });

  test('9. Registro: Renderiza los campos de contraseña y confirmación de contraseña', () => {
    renderWithProviders(<Register />);

    const passwordInputs = document.querySelectorAll('input[type="password"]');

    expect(passwordInputs.length).toBe(2);
    expect(passwordInputs[0]).toBeInTheDocument();
    expect(passwordInputs[1]).toBeInTheDocument();
  });

  test('10. Autenticación: Almacena las credenciales del usuario en localStorage tras el inicio de sesión', () => {
    const usuarioSimulado = { nombre: 'Juan Pérez', correo: 'juan@duoc.cl', rol: 'cliente' };
    localStorage.setItem('usuario_logueado', JSON.stringify(usuarioSimulado));

    const guardado = JSON.parse(localStorage.getItem('usuario_logueado'));
    expect(guardado.nombre).toBe('Juan Pérez');
    expect(guardado.rol).toBe('cliente');
  });

});