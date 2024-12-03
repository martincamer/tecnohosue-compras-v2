import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ComprasProvider } from "./context/ComprasContext";
import { ProductosProvider } from "./context/ProductosContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ClientesProvider } from "./context/ClientesContext";
import { CajaBancoProvider } from "./context/CajaBancoContext";
import { Toaster } from "react-hot-toast";
import RutaProtegida from "./components/RutaProtegida";
import DocumentTitle from "./components/DocumentTitle";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Proveedores from "./pages/Proveedores";
import DetalleProveedor from "./pages/DetalleProveedor";
import NotFound from "./pages/NotFound";
import Bancos from "./pages/Bancos";
import Cajas from "./pages/Cajas";
import Clientes from "./pages/Clientes";
import Cliente from "./pages/Cliente";
import Perfil from "./pages/Perfil";
import Casas from "./pages/Casas";
import Permisos from "./pages/Permisos";
import AccesoDenegado from "./pages/AccesoDenegado";
import AllCajas from "./pages/AllCajas";
import CajaUnica from "./pages/CajaUnica";
import ErrorBoundary from "./components/ErrorBoundary";
import { CategoriasProvider } from "./context/CategoriasContext";

function App() {
  const { auth } = useAuth();
  return (
    <ErrorBoundary>
      <AuthProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <HelmetProvider>
            <CategoriasProvider>
              <BrowserRouter>
                <CajaBancoProvider>
                  <ComprasProvider>
                    <ClientesProvider>
                      <ProductosProvider>
                        <DocumentTitle />
                        <Toaster
                          position="top-right"
                          toastOptions={{
                            duration: 3000,
                            style: {
                              background: "#333",
                              color: "#fff",
                            },
                            success: {
                              duration: 3000,
                              style: {
                                background: "#059669",
                              },
                            },
                            error: {
                              duration: 3000,
                              style: {
                                background: "#DC2626",
                              },
                            },
                            loading: {
                              duration: Infinity,
                              style: {
                                background: "#333",
                              },
                            },
                          }}
                        />
                        <Routes>
                          {/* Rutas Públicas */}
                          <Route path="/" element={<Login />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/registro" element={<Registro />} />

                          {/* Rutas Protegidas */}
                          <Route path="/dashboard" element={<RutaProtegida />}>
                            <Route index element={<Dashboard />} />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="inventario/productos"
                              element={
                                auth?.user?.permisos?.productos?.acceso ? (
                                  <Productos />
                                ) : (
                                  <AccesoDenegado />
                                )
                              }
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="compras/proveedores"
                              element={
                                auth?.user?.permisos?.compras?.acceso ? (
                                  <Proveedores />
                                ) : (
                                  <AccesoDenegado />
                                )
                              }
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="compras/proveedores/:id"
                              element={<DetalleProveedor />}
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="transacciones/bancos"
                              element={
                                auth?.user?.permisos?.bancos?.acceso ? (
                                  <Bancos />
                                ) : (
                                  <AccesoDenegado />
                                )
                              }
                            />
                          </Route>

                          <Route element={<RutaProtegida />}>
                            <Route
                              path="transacciones/cajas"
                              element={
                                auth?.user?.permisos?.cajas?.acceso ? (
                                  <Cajas />
                                ) : (
                                  <AccesoDenegado />
                                )
                              }
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              element={
                                auth?.user?.permisos?.cajas?.ver ? (
                                  <AllCajas />
                                ) : (
                                  <AccesoDenegado />
                                )
                              }
                              path="transacciones/all-cajas"
                              // element={<AllCajas />}
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="transacciones/caja/:id"
                              element={<CajaUnica />}
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="ventas/clientes"
                              element={
                                auth?.user?.permisos?.ventas?.acceso ? (
                                  <Clientes />
                                ) : (
                                  <AccesoDenegado />
                                )
                              }
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="ventas/clientes/:id"
                              element={<Cliente />}
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="profile"
                              element={
                                auth?.user?.permisos?.configuracion?.acceso ? (
                                  <Perfil />
                                ) : (
                                  <AccesoDenegado />
                                )
                              }
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="configuracion/permisos"
                              element={
                                auth?.user?.rol === "ADMIN" ? (
                                  <Permisos />
                                ) : (
                                  <AccesoDenegado />
                                )
                              }
                            />
                          </Route>
                          <Route element={<RutaProtegida />}>
                            <Route
                              path="ventas/casas"
                              element={
                                auth?.user?.permisos?.ventas?.acceso ? (
                                  <Casas />
                                ) : (
                                  <AccesoDenegado />
                                )
                              }
                            />
                          </Route>

                          <Route element={<RutaProtegida />}>
                            <Route path="*" element={<NotFound />} />
                          </Route>
                        </Routes>
                      </ProductosProvider>
                    </ClientesProvider>
                  </ComprasProvider>
                </CajaBancoProvider>
              </BrowserRouter>
            </CategoriasProvider>
          </HelmetProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
