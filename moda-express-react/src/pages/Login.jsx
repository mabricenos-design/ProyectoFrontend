import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const c = correo.trim().toLowerCase();

    if (c === "admin@modaexpress.cl" && password === "admin123") {
      const admin = { nombre: "Administrador", correo: c, rol: "administrador" };
      login(admin);
      alert("¡Bienvenido Admin!");
      navigate("/admin");
      return;
    }

    const registrado = JSON.parse(localStorage.getItem("cuenta_registrada"));
    if (registrado && registrado.correo.toLowerCase() === c && registrado.password === password) {
      login(registrado);
      alert("Bienvenido de nuevo " + registrado.nombre);
      navigate("/productos");
      return;
    }

    const usuarioGenerico = { nombre: c.split("@")[0], correo: c, rol: "cliente" };
    login(usuarioGenerico);
    alert("Inicio de sesión exitoso.");
    navigate("/productos");
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo:</label>
            <input type="email" className="form-control" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-dark w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
}