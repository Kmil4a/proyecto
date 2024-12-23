import { useState, useEffect } from "react";
import TableSalas from "../components/TableSalas";
import { Button } from "reactstrap";
import ModalSala from "../components/ModalSala";
import "../styles/SalasPage.scss";
import ModalReserva from "../components/ModalReserva";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const SalasPage = () => {
  const [salas, setSalas] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalReserva, setModalReserva] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [salaSelected, setSalaSelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    //verificar exista un access_token en el localstorage
    if (!localStorage.getItem("access_token")) {
      navigate("/");
    }

    fetchSalas();
  }, []);

  const toggle = () => setModal(!modal);
  const toggleReserva = () => setModalReserva(!modalReserva);

  const fetchSalas = async () => {
    const response = await api.get("room", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(data);
    setSalas(data.rooms);
    setIsAdmin(data.user.is_superuser);

    setIsLoading(false);
  };

  const handleEdit = (sala) => {
    setSalaSelected(sala);
    setIsEdit(true);
    toggle();
  };

  const handleCreate = () => {
    setIsEdit(false);
    toggle();
    setSalaSelected({});
  };

  const handleReserva = (sala) => {
    setSalaSelected(sala);
    toggleReserva();
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div className="page_container">
      <div className="header_page">
        <h1 id="titulo">Reserva de Salas</h1>
        <Button color="danger" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>

      <Navbar />
      {isAdmin && (
        <div>
          <Button
            id="boton-crearSala"
            color="danger"
            onClick={handleCreate}
            className="button_crear_sala"
          >
            Crear nueva sala
          </Button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <TableSalas
          salas={salas}
          handleEdit={handleEdit}
          handleReserva={handleReserva}
          fetchSalas={fetchSalas}
          getData={fetchSalas}
        />
      )}
      {modal && (
        <ModalSala
          isEdit={isEdit}
          modal={modal}
          toggle={toggle}
          getData={fetchSalas}
          sala={salaSelected}
        />
      )}
      {modalReserva && (
        <ModalReserva
          modal={modalReserva}
          toggle={toggleReserva}
          sala={salaSelected}
          salas={salas}
          salaSelected={salaSelected}
        />
      )}
    </div>
  );
};

export default SalasPage;
