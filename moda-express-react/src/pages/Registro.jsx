import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const nuevoUsuario = { nombre, correo, password, rol: "cliente" };
    localStorage.setItem("cuenta_registrada", JSON.stringify(nuevoUsuario));
    login(nuevoUsuario);
    alert("¡Cuenta creada exitosamente!");
    navigate("/productos");
  };

  return (
    <div className="container py-5" style={{ maxWidth: "450px" }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Crear Cuenta</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre Completo:</label>
            <input type="text" className="form-control" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico:</label>
            <input type="email" className="form-control" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña:</label>
            <input type="password" className="form-control" required value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-dark w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
}