import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";
import { useState } from "react";
import "../styles/TableSalas.css";
import Swal from "sweetalert2";

const ItemTable = ({ sala, handleEdit, getData, handleReserva }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminada, no podrás recuperar la sala",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/room/${sala.id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            getData();
            Swal.fire("¡Sala eliminada!", "", "success");
          }
        } catch (error) {
          Swal.fire("¡Error!", "No se pudo eliminar la sala", "error");
        }
      }
    });
  };

  return (
    <tr key={sala.id}>
      <th scope="row">{sala.name}</th>
      <td>{sala.capacity}</td>
      <td className="item_table_salas_eventos">
        Esta sala tiene {sala.reservations} reservas para hoy{" "}
        <Button
          color="danger"
          id="boton-reservar"
          onClick={() => handleReserva(sala)}
        >
          Reservar
        </Button>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle
            data-toggle="dropdown"
            tag="span"
            style={{ cursor: "pointer" }}
          >
            ...
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleEdit(sala)}>Editar</DropdownItem>
            <DropdownItem onClick={onDelete}>Eliminar</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default ItemTable;
