import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Swal from "sweetalert2";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simular petición al servidor
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        navigate("/salas");
      } else {
        Swal.fire("Error", "Credenciales inválidas.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un problema con el servidor.", "error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        Swal.fire(
          "¡Registro exitoso!",
          "Ahora puedes iniciar sesión.",
          "success"
        );
        setActiveTab("login"); // Cambiar a la pestaña de login
      } else {
        Swal.fire("Error", "No se pudo completar el registro.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un problema con el servidor.", "error");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Nav tabs className="justify-content-center">
            <NavItem className="nav-link-auth">
              <NavLink
                className={classnames({ active: activeTab === "login" })}
                style={{ cursor: "pointer", color: "black" }}
                onClick={() => toggleTab("login")}
              >
                Iniciar Sesión
              </NavLink>
            </NavItem>
            <NavItem className="nav-link-auth">
              <NavLink
                className={classnames({ active: activeTab === "register" })}
                style={{ cursor: "pointer" }}
                onClick={() => toggleTab("register")}
              >
                Registrarse
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className="mt-4">
            <TabPane tabId="login">
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="username">Nombre de usuario</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username1"
                    placeholder="Ingresa tu correo"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Contraseña</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password1"
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <Button color="primary" type="submit" block>
                  Iniciar Sesión
                </Button>
              </Form>
            </TabPane>
            <TabPane tabId="register">
              <Form onSubmit={handleRegister}>
                <FormGroup>
                  <Label for="username">Nombre de usuario</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Ingresa tu nombre"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Correo Electrónico</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Ingresa tu correo"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Contraseña</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Crea una contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <Button color="success" type="submit" block>
                  Registrarse
                </Button>
              </Form>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
