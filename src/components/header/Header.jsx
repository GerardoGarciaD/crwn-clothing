import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

// Se importan los styled components
import {
  HeaderContainer,
  LogoContainer,
  OptionDiv,
  OptionsContainer,
  OptionLink
} from "./HeaderStyles";

// se importa la funcion que crea High Order Components
import { connect } from "react-redux";

// Se importa la funcion auth para corroborar las sesiones
import { auth } from "../../firebase/Firebase.utils";

// Se importa el componente para el icono del carrito
import CartIcon from "../cartIcon/CartIcon";

// Se importa el CartDropDown
import CartDropDown from "../cartDropDown/CartDropDown";

// Esta funcion permite mandar el state a cada selector de manera automatica
import { createStructuredSelector } from "reselect";

// se importa el selector para obtener el usuario actual
import { selectCurrentUser } from "../../redux/user/UserSelectors";

// se importa el selector que verifica si se muestra el div del carrito
import { selectCartHidden } from "../../redux/cart/CartSelectors";
// Se importa la a accion que desencadena funciones del UserSagas
import { signOutStart } from "../../redux/user/UserActions";

// Se destructturing de las props de este mismo componente (ya que ahora es un High Order Component ) por que
// se utilizo la funcion connect de react-redux
function Header({ currentUser, hidden, signOutStart }) {
  return (
    <HeaderContainer className="header">
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>

      <OptionsContainer>
        <OptionLink to="/shop">Shop</OptionLink>
        <Link className="option" to="/shop">
          Contact
        </Link>

        {currentUser ? (
          // Se llama a la funcion que se obtiene de mapDispatchToProps
          <OptionDiv className="option" onClick={signOutStart}>
            SIGN OUT
          </OptionDiv>
        ) : (
          <OptionLink className="option" to="/signin">
            SIGN IN
          </OptionLink>
        )}
        <CartIcon />
        {hidden ? null : <CartDropDown />}
      </OptionsContainer>
    </HeaderContainer>
  );
}

// con la funcion createStructuredSelector se pasa automaticamente el state completo a cada selector que lo vaya a usar
// (selectCurrentUser, selectCurrentUser)
const mapsStateToProp = createStructuredSelector({
  // Como es una arrow function se regresan por default estos objetos
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

// Se crea un objeto que consta de una funcion y que a su vez ejecuta una accion de UserActions
const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

// Finalmete se exporta el componente como un highOrderCommponent
export default connect(
  mapsStateToProp,
  mapDispatchToProps
)(Header);
