import React from "react";
import { Button, Table } from "reactstrap";
import Swal from "sweetalert2";

const TableReservas = ({ reservas, getData }) => {
  const handleCancel = (id) => {
    // console.log(id);
    Swal.fire({
      title: "¿Deseas cancelar tu reserva?",
      text: "Al aceptar confirmar cancelas tu reserva",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/reservas/${id}/cancel`,
            {
              method: "POST",
            }
          );
          // console.log(response);
          if (response.status === 200) {
            getData();
            Swal.fire("¡Reserva cancelada!", "", "success");
          }
        } catch (error) {
          Swal.fire("¡Error!", "No se pudo cancelar tu reserva", "error");
        }
      }
    });
  };

  const handleCheckIn = (id) => {
    // console.log(id);
    Swal.fire({
      title: "¿Deseas confirmar tu reserva?",
      text: "Al aceptar confirmas tu asistencia a la reserva",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/reservas/${id}/checkin`,
            {
              method: "POST",
            }
          );
          // console.log(response);
          if (response.status === 200) {
            getData();
            Swal.fire("¡Reserva confirmada!", "", "success");
          }
        } catch (error) {
          Swal.fire("¡Error!", "No se pudo confirmar la reserva", "error");
        }
      }
    });
  };
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Sala</th>
          <th>Hora Inicio</th>
          <th>Hora Fin</th>
          <th>Fecha</th>
          <th>Confirmado</th>
          <th>Cancelado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {reservas.map((reserva) => (
          <tr key={reserva.id}>
            <td>{reserva.room.name}</td>
            <td>{reserva.start_time}</td>
            <td>{reserva.end_time}</td>
            <td>
              {new Date(reserva.date).toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </td>
            <td>{reserva.confirmed ? "Sí" : "No"}</td>
            <td>{reserva.canceled ? "Sí" : "No"}</td>
            <td>
              <Button
                color="success"
                className="btn-accion"
                disabled={reserva.confirmed || reserva.canceled}
                onClick={() => handleCheckIn(reserva.id)}
              >
                Check-in
              </Button>{" "}
              <Button color="warning" className="btn-accion">
                Editar
              </Button>{" "}
              <Button
                disabled={reserva.canceled}
                color="danger"
                className="btn-accion"
                onClick={() => handleCancel(reserva.id)}
              >
                Cancelar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableReservas;
