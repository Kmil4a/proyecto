import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <nav className="navbar-salas">
      <Link className={`${pathname === "/salas" ? "active" : ""}`} to="/salas">
        Salas
      </Link>
      <Link
        className={`${pathname === "/reservas" ? "active" : ""}`}
        to="/reservas"
      >
        Reservas
      </Link>
    </nav>
  );
};

export default Navbar;
