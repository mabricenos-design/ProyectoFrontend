import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const usuario = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      password,
      rol: "cliente"
    };

    localStorage.setItem("cuenta_registrada", JSON.stringify(usuario));
    login(usuario);
    alert("¡Cuenta creada con éxito! Sesión iniciada.");
    navigate("/productos");
  };

  return (
    <main className="container my-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm border p-4 bg-white">
        <div className="text-center mb-4">
          <div className="fs-1">📝</div>
          <h2 className="fw-bold">Crear cuenta</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre completo</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Correo electrónico</label>
            <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Confirmar contraseña</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2 fw-bold">Crear cuenta</button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-muted mb-1">¿Ya tienes una cuenta?</p>
          <Link to="/login" className="fw-bold text-warning text-decoration-none">Iniciar sesión</Link>
        </div>
      </div>
    </main>
  );
};