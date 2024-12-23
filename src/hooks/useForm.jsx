import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (eOrUpdater) => {
    if (typeof eOrUpdater === "function") {
      // Si se pasa una función, usarla para actualizar el estado acumulativamente
      setFormData((prevState) => ({
        ...prevState,
        ...eOrUpdater(prevState),
      }));
    } else {
      // Si se pasa un evento, procesarlo como entrada de formulario
      const { name, value } = eOrUpdater.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return { formData, handleInputChange, handleSubmit };
};

export default useForm;
