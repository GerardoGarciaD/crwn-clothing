import React from "react";
import "./CustomButton.scss";

export default function CustomButton({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) {
  return (
    <button
      className={`${inverted ? "inverted" : ""}${
        isGoogleSignIn ? "google-sign-in" : ""
      } custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

// import React from "react";
// import "./CustomButton.scss";

// // Se importa el styled component para el estilo del boton
// import { CustomButtonContainer } from "./CustomButtonStyles";

// export default function CustomButton({ children, ...props }) {
//   return <CustomButtonContainer {...props}> {children}</CustomButtonContainer>;
// }
