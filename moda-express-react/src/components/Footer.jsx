import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>ModaExpress</h5>
            <p className="small text-muted">Moda moderna y accesible para toda la familia.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Contacto</h5>
            <p className="small text-muted mb-1">contacto@modaexpress.cl</p>
            <p className="small text-muted">Santiago Centro, Chile</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Enlaces</h5>
            <p className="mb-1"><Link to="/productos" className="text-white-50 text-decoration-none">Productos</Link></p>
            <p className="mb-1"><Link to="/registro" className="text-white-50 text-decoration-none">Registrarse</Link></p>
          </div>
        </div>
        <hr className="bg-secondary" />
        <p className="text-center small text-muted">© 2026 ModaExpress. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}