import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import Layout from './components/Layout';
import Pendiente from './pages/Pendiente';
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import BlogDetalle from './pages/BlogDetalle';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import CompraExitosa from './pages/CompraExitosa';
import CompraError from './pages/CompraError';
import Login from './pages/Login';
import Registro from './pages/Registro';

// Todas las rutas del sitio, cada vista se va reemplazando por su pagina real
function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:codigo" element={<DetalleProducto />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetalle />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/compra-exitosa/:id" element={<CompraExitosa />} />
              <Route path="/compra-error" element={<CompraError />} />
            </Route>
            <Route path="/admin" element={<Pendiente titulo="Panel de administración" />} />
            <Route path="/admin/productos" element={<Pendiente titulo="Productos (admin)" />} />
            <Route path="/admin/productos/nuevo" element={<Pendiente titulo="Nuevo producto" />} />
            <Route path="/admin/productos/editar/:codigo" element={<Pendiente titulo="Editar producto" />} />
            <Route path="/admin/productos/criticos" element={<Pendiente titulo="Productos críticos" />} />
            <Route path="/admin/usuarios" element={<Pendiente titulo="Usuarios (admin)" />} />
            <Route path="/admin/usuarios/nuevo" element={<Pendiente titulo="Nuevo usuario" />} />
            <Route path="/admin/usuarios/editar/:run" element={<Pendiente titulo="Editar usuario" />} />
            <Route path="/admin/usuarios/:run/compras" element={<Pendiente titulo="Historial de compras" />} />
            <Route path="/admin/ordenes" element={<Pendiente titulo="Órdenes" />} />
            <Route path="/admin/ordenes/:id" element={<Pendiente titulo="Boleta" />} />
          </Routes>
        </HashRouter>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
