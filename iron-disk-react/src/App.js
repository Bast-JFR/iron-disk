import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import Layout from './components/Layout';
import Pendiente from './pages/Pendiente';
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';

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
              <Route path="/categorias" element={<Pendiente titulo="Categorías" />} />
              <Route path="/ofertas" element={<Pendiente titulo="Ofertas" />} />
              <Route path="/nosotros" element={<Pendiente titulo="Nosotros" />} />
              <Route path="/blogs" element={<Pendiente titulo="Blogs" />} />
              <Route path="/blogs/:id" element={<Pendiente titulo="Detalle de blog" />} />
              <Route path="/contacto" element={<Pendiente titulo="Contacto" />} />
              <Route path="/login" element={<Pendiente titulo="Iniciar sesión" />} />
              <Route path="/registro" element={<Pendiente titulo="Registro" />} />
              <Route path="/carrito" element={<Pendiente titulo="Carrito" />} />
              <Route path="/checkout" element={<Pendiente titulo="Checkout" />} />
              <Route path="/compra-exitosa/:id" element={<Pendiente titulo="Compra exitosa" />} />
              <Route path="/compra-error" element={<Pendiente titulo="Pago con error" />} />
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
