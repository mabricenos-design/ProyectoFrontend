import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    return JSON.parse(localStorage.getItem("usuario_logueado")) || null;
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario_logueado", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario_logueado");
    }
  }, [usuario]);

  const login = (datosUsuario) => setUsuario(datosUsuario);
  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);