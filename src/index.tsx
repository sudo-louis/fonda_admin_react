
 
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Flowbite } from "flowbite-react";

 import "./index.css";

import store, { RootState } from './Redux/store';
import theme from "./flowbite-theme";

import SignInPage from "./pages/authentication/sign-in";
 
import DashboardPage from "./pages";

import EcommerceProductsPage from "./pages/e-commerce/productos";
import CategoriasPage from "./pages/categorias/categorias";
import ProveedoresPage from "./pages/proveedores/proveedores";


 
const AppRoutes = () => {
  // Usamos useSelector para verificar si el usuario está autenticado
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/sign-in" element={userInfo ? <Navigate to="/dashboard" replace /> : <SignInPage />} />
 
      {/* Rutas protegidas (si no hay userInfo, redirige al login) */}
      <Route path="/dashboard" element={userInfo ? <DashboardPage /> : <Navigate to="/sign-in" replace />} />
      <Route path="/productos" element={userInfo ? <EcommerceProductsPage /> : <Navigate to="/sign-in" replace />} />
      <Route path="/categorias" element={userInfo ? <CategoriasPage /> : <Navigate to="/sign-in" replace />} />
      <Route path="/proveedores" element={userInfo ? <ProveedoresPage /> : <Navigate to="/sign-in" replace />} />
  
      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to={userInfo ? "/dashboard" : "/sign-in"} replace />} />
    </Routes>
  );
};

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <Flowbite theme={{ theme }}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </Flowbite>
      </Provider>
    </StrictMode>
  );
}
