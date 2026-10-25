import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { Productos } from "./pages/Productos";
import { DetalleProducto } from "./pages/DetalleProducto";
import { Carrito } from "./pages/Carrito";
import { Pago } from "./pages/Pago";
import { EstadoPedido } from "./pages/EstadoPedido";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/detalle-producto" element={<DetalleProducto />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/pago" element={<Pago />} />
                <Route path="/estado-pedido" element={<EstadoPedido />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;