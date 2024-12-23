import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Label,
  Input,
} from "reactstrap";
import useForm from "../hooks/useForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BloqueHorario from "./BloqueHorario";
import api from "../axiosConfig";

const ModalReserva = ({
  modal,
  toggle,
  isEdit,
  sala,
  salas = [],
  salaSelected,
}) => {
  const [bloquesHorarios, setBloquesHorarios] = useState([]);
  const navigate = useNavigate();
  const { formData, handleInputChange, handleSubmit } = useForm(
    {
      room: sala.id || "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      start_time: "",
      end_time: "",
      confirmed: false,
      canceled: false,
    },
    (formData) => {
      if (isEdit) {
        editarSala(formData);
      } else {
        createReserva(formData);
      }
    }
  );

  const { room, description, date, start_time, end_time } = formData;

  useEffect(() => {
    if (salaSelected) {
      fetchBloquesHorarios();
    }
  }, [salaSelected]);

  const fetchBloquesHorarios = async () => {
    const response = await api.get(`/rooms/${salaSelected.id}/time-blocks/
    `);
    const data = response.data;
    data.forEach((bloque) => {
      bloque.checked = false;
    });
    console.log(data);
    setBloquesHorarios(data);
  };

  useEffect(() => {
    // Verificar qué bloque está seleccionado y actualizar el estado acumulativamente
    const bloqueSeleccionado = bloquesHorarios.find((bloque) => bloque.checked);

    if (bloqueSeleccionado) {
      handleInputChange((prevState) => ({
        ...prevState,
        end_time: bloqueSeleccionado.end_time,
        start_time: bloqueSeleccionado.start_time,
      }));
    }
  }, [bloquesHorarios]);

  const validateForm = () => {
    if (
      room === "" ||
      description === "" ||
      date === "" ||
      start_time === "" ||
      end_time === ""
    ) {
      Swal.fire("Todos los campos son obligatorios", "", "error");
      return false;
    }
    return true;
  };

  const createReserva = async (formData) => {
    if (!validateForm()) return;
    try {
      console.log(formData);
      const response = await fetch("http://127.0.0.1:8000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      const data = await response.json();
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Reserva creada con éxito",
        });
        toggle();
        navigate("/reservas");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isEdit ? "Editar" : "Crear nueva"} Reserva
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="room">Sala</Label>
            <Input
              type="select"
              name="room"
              id="room"
              value={room}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Selecciona una sala
              </option>
              {salas.map((sala) => (
                <option key={sala.id} value={sala.id}>
                  {sala.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="description">Motivo</Label>
            <Input
              id="description"
              name="description"
              placeholder=""
              type="text"
              value={description}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="date">Fecha</Label>
            <Input
              min={new Date().toISOString().split("T")[0]}
              id="date"
              name="date"
              placeholder=""
              type="date"
              value={date}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Selecciona horario</Label>
            <div className="bloques_horario_container">
              {bloquesHorarios.map((bloque, index) => (
                <BloqueHorario
                  index={index}
                  key={index}
                  start_time={bloque.start_time}
                  end_time={bloque.end_time}
                  checked={bloque.checked}
                  is_reserved={bloque.is_reserved}
                  setBloquesHorarios={setBloquesHorarios}
                  bloquesHorarios={bloquesHorarios}
                />
              ))}
            </div>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          {isEdit ? "Editar" : "Crear"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalReserva;
