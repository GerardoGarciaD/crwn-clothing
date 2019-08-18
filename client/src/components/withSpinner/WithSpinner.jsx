import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./WithSpinnerStyles";
// WithSpinner es un HOC (High Order Component), recibe como parametro un componente
const WithSpinner = WrappedComponent => {
  // El componente que se recibe, crea otro componente, el componente que se crea, puede utilizar las props
  // que recibe el componente "padre" (WrappedComponent)
  const Spinner = ({ isLoading, ...otherProps }) => {
    //   Utilizando las props se puede renderizar el componente que se encarga de mostrar un spinner (loading page)
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      // O regresar el componente "padre", el cual manda como parametro las mismas props que recibe
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
