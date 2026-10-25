import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 mt-5">
      <div className="container">
        <div className="row g-4 text-center text-md-start">
          <div className="col-md-6">
            <h5 className="fw-bold text-white">ModaExpress</h5>
            <p className="text-secondary small">
              Moda moderna y accesible para toda la familia.
            </p>
          </div>
          <div className="col-md-3">
            <h5 className="fw-bold text-white">Contacto</h5>
            <p className="text-secondary small mb-1">contacto@modaexpress.cl</p>
            <p className="text-secondary small">Santiago Centro, Chile</p>
          </div>
          <div className="col-md-3">
            <h5 className="fw-bold text-white">Enlaces</h5>
            <ul className="list-unstyled">
              <li><Link to="/productos" className="text-secondary text-decoration-none small">Productos</Link></li>
              <li><Link to="/registro" className="text-secondary text-decoration-none small">Registrarse</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-top border-secondary text-center py-3 mt-4">
          <p className="text-secondary small mb-0">© 2026 ModaExpress. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};