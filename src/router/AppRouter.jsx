import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SalasPage from "../pages/SalasPage";
import ReservasPage from "../pages/ReservasPage";
import AuthPage from "../pages/AuthPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/salas" element={<SalasPage />} />
      <Route path="/reservas" element={<ReservasPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
