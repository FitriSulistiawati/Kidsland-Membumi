import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components";
import HomePage from "./pages/HomePage";
import Pendaftaran from "./pages/Pendaftaran";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Chatbot from "./components/chatbot";

// Komponen untuk melindungi rute admin
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<Navigate to="/#about" replace />} />
          <Route path="program" element={<Navigate to="/#program" replace />} />
          <Route path="pendaftaran" element={<Pendaftaran />} />
          <Route path="login" element={<Login />} />
          
          {/* Rute admin sekarang dilindungi */}
          <Route path="admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;