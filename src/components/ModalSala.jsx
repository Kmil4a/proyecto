import React from "react";
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

const ModalSala = ({ modal, toggle, getData, isEdit, sala }) => {
  const { formData, handleInputChange, handleSubmit } = useForm(
    {
      name: sala?.name || "",
      capacity: sala?.capacity || "",
    },
    (formData) => {
      if (isEdit) {
        editarSala(formData);
      } else {
        createSala(formData);
      }
    }
  );
  // console.log(sala);

  const { name, capacity } = formData;

  const validateForm = () => {
    if (name === "" || capacity === "") {
      Swal.fire("Todos los campos son obligatorios", "", "error");
      return false;
    }
    if (capacity < 1) {
      Swal.fire("La capacidad debe ser mayor a 0", "", "error");
      return false;
    }
    return true;
  };

  const createSala = async (formData) => {
    if (!validateForm()) return;
    Swal.fire({
      title: "Creando sala...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const response = await fetch("http://127.0.0.1:8000/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      getData();
      toggle();
      Swal.fire("Sala creada", "", "success");
    } else {
      Swal.fire("Error al crear la sala", "", "error");
    }
  };

  const editarSala = async (formData) => {
    if (!validateForm()) return;
    Swal.fire({
      title: "Editando sala...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const response = await fetch(`http://127.0.0.1:8000/api/room/${sala.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      getData();
      toggle();
      Swal.fire("Sala editada", "", "success");
    } else {
      Swal.fire("Error al editar la sala", "", "error");
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isEdit ? "Editar" : "Crear nueva"} Sala
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Nombre</Label>
            <Input
              required
              id="name"
              name="name"
              placeholder=""
              type="text"
              value={name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="capacity">Capacidad</Label>
            <Input
              required
              id="capacity"
              name="capacity"
              placeholder=""
              type="number"
              value={capacity}
              onChange={handleInputChange}
            />
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

export default ModalSala;
