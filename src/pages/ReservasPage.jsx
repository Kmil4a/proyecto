import { useState, useEffect } from "react";
import TableReservas from "../components/TableReservas";
import Navbar from "../components/Navbar";
import api from "../axiosConfig";

const ReservasPage = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetchReservas();
  }, []);

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
      <h1 id="titulo">Mis Reservas</h1>
      <Navbar />
      <TableReservas getData={fetchReservas} reservas={reservas} />
    </div>
  );
};

export default ReservasPage;
