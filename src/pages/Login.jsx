import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const correoClean = correo.trim().toLowerCase();

    if (correoClean === "admin@modaexpress.cl" && password === "admin123") {
      const adminUser = { nombre: "Administrador", correo: correoClean, rol: "administrador" };
      login(adminUser);
      alert("¡Bienvenido al Panel de Administración!");
      navigate("/admin");
      return;
    }

    const cuentaGuardada = JSON.parse(localStorage.getItem("cuenta_registrada"));

    if (cuentaGuardada && cuentaGuardada.correo.toLowerCase() === correoClean && cuentaGuardada.password === password) {
      login(cuentaGuardada);
      alert("Bienvenido de nuevo, " + cuentaGuardada.nombre);
      navigate("/productos");
    } else {
      const usuarioGenerico = { nombre: correoClean.split("@")[0], correo: correoClean, rol: "cliente" };
      login(usuarioGenerico);
      alert("Inicio de sesión exitoso.");
      navigate("/productos");
    }
  };

  return (
    <main className="container my-5" style={{ maxWidth: "480px" }}>
      <div className="card shadow-sm border p-4 bg-white">
        <div className="text-center mb-4">
          <div className="fs-1">👤</div>
          <h2 className="fw-bold">Bienvenido de nuevo</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Correo electrónico</label>
            <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2 fw-bold">Iniciar sesión</button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-muted mb-1">¿Todavía no tienes una cuenta?</p>
          <Link to="/registro" className="fw-bold text-warning text-decoration-none">Crear una cuenta</Link>
        </div>
      </div>
    </main>
  );
};