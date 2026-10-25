import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    alert("Has cerrado sesión exitosamente.");
    navigate("/login");
  };

  return (
    <>
      <header className="bg-light border-bottom text-center py-2">
        <h1 className="h4 m-0 text-dark fw-bold">ModaExpress</h1>
        <p className="small text-muted mb-0">Moda, estilo y calidad al mejor precio</p>
      </header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold d-lg-none" to="/">
            Menú
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/" onClick={() => setMenuAbierto(false)}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/productos" onClick={() => setMenuAbierto(false)}>
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/carrito" onClick={() => setMenuAbierto(false)}>
                  🛒 Carrito
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/estado-pedido" onClick={() => setMenuAbierto(false)}>
                  Estado Pedido
                </Link>
              </li>
              {usuario ? (
                <li className="nav-item">
                  <button
                    onClick={(e) => {
                      setMenuAbierto(false);
                      handleLogout(e);
                    }}
                    className="btn btn-link nav-link text-warning fw-bold text-decoration-none"
                  >
                    Cerrar sesión ({usuario.nombre})
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-bold" to="/registro" onClick={() => setMenuAbierto(false)}>
                      Registrarse
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-bold" to="/login" onClick={() => setMenuAbierto(false)}>
                      Iniciar sesión
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}