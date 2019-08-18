import React from "react";
import "./FormInput.scss";

// Se hace destructuring de  las props
export default function FormInput({ handleChange, label, ...otherProps }) {
  return (
    <div className="group">
      <input className="form-input" onChange={handleChange} {...otherProps} />
      {/* Se verifica si se recibió la prop label */}
      {label ? (
        // Si se recibió se muestra eso
        <label
          className={`${
            // Se verifica si la longitud de las propiedades es mayor a 0 para poner o quitar la className
            // que manda el texto hacia arriba del input
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}
