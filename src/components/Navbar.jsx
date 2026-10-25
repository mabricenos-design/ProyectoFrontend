import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { usuario, logout } = useAuth();
  const { carrito } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Has cerrado sesión exitosamente.");
    navigate("/login");
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="bg-light border-bottom">
      <div className="text-center py-3">
        <h1 className="fw-bold mb-0 text-dark">ModaExpress</h1>
        <p className="text-muted small mb-0">Moda, estilo y calidad al mejor precio</p>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <button
            className="navbar-toggler mx-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav gap-2 text-center align-items-center">
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold position-relative" to="/carrito">
                  🛒 Carrito
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/estado-pedido">Estado Pedido</Link>
              </li>

              {usuario ? (
                <>
                  {usuario.rol === "administrador" && (
                    <li className="nav-item">
                      <Link className="btn btn-sm btn-outline-warning ms-2" to="/admin">
                        Panel Admin
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button className="btn btn-link nav-link text-warning fw-bold ms-2" onClick={handleLogout}>
                      Cerrar sesión ({usuario.nombre})
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-bold" to="/registro">Registrarse</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-bold" to="/login">Iniciar sesión</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};