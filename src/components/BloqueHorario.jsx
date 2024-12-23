import React from "react";

const BloqueHorario = ({
  index,
  start_time,
  end_time,
  checked,
  is_reserved,
  setBloquesHorarios,
  bloquesHorarios,
}) => {
  const handleCheck = () => {
    if (is_reserved) return;
    console.log("aa");
    const newBloquesHorarios = bloquesHorarios.map((bloque, i) => {
      if (i === index) {
        bloque.checked = !checked;
      } else {
        bloque.checked = false;
      }
      return bloque;
    });
    setBloquesHorarios(newBloquesHorarios);
  };

  return (
    <p
      className={`bloque_horario ${checked ? "bloque_horario_checked" : ""} ${
        is_reserved ? "bloque_horario_unavailable" : ""
      }`}
      onClick={handleCheck}
    >
      {start_time} - {end_time}
    </p>
  );
};

export default BloqueHorario;
