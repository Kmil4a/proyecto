import { useState, useEffect } from "react";
import TableReservas from "../components/TableReservas";
import Navbar from "../components/Navbar";
import api from "../axiosConfig";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const ReservasPage = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/");
    }
    fetchReservas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const fetchReservas = async () => {
    try {
      const response = await api("reservas");
      const data = response.data;
      setReservas(data);
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
    }
  };

  console.log(reservas);

  return (
    <div className="page_container">
      <div className="header_page">
        <h1 id="titulo">Mis Reservas</h1>
        <Button color="danger" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>
      <Navbar />
      <TableReservas getData={fetchReservas} reservas={reservas} />
    </div>
  );
};

export default ReservasPage;
