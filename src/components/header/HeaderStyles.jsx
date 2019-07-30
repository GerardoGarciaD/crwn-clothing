// La funcion css que se importa de styled components, permite que escribir bloques de css dentro de javascript
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// Aqui se crea el bloque de css que se guarda en la variable OptionContainerStyles, esto se hace para que se pueda
// reutilizar ese bloque de codigo
const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

// Aqui, directamente se crea un elemento Link de la libreria react-router-dom con estilos css
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// En estos dos componentes se reutiliza el bloque de codigo css
export const OptionLink = styled(Link)`
  ${OptionContainerStyles}
`;
export const OptionDiv = styled.div`
  ${OptionContainerStyles}
`;
