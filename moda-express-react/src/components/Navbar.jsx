import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    alert("Has cerrado sesión exitosamente.");
    navigate("/login");
  };

  return (
    <>
      <header className="bg-light border-bottom text-center py-3">
        <h1 className="h2 m-0 text-dark fw-bold">ModaExpress</h1>
        <p className="small text-muted mb-0">Moda, estilo y calidad al mejor precio</p>
      </header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <div className="navbar-nav mx-auto flex-row gap-3">
            <Link className="nav-link text-white fw-bold" to="/">Inicio</Link>
            <Link className="nav-link text-white fw-bold" to="/productos">Productos</Link>
            <Link className="nav-link text-white fw-bold" to="/carrito">🛒 Carrito</Link>
            <Link className="nav-link text-white fw-bold" to="/estado-pedido">Estado Pedido</Link>
            {usuario ? (
              <button onClick={handleLogout} className="btn btn-link nav-link text-warning fw-bold">
                Cerrar sesión ({usuario.nombre})
              </button>
            ) : (
              <>
                <Link className="nav-link text-white fw-bold" to="/registro">Registrarse</Link>
                <Link className="nav-link text-white fw-bold" to="/login">Iniciar sesión</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}