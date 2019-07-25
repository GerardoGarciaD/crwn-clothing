import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

// se importa la funcion que crea High Order Components
import { connect } from "react-redux";

// Se importa la funcion auth para corroborar las sesiones
import { auth } from "../../firebase/Firebase.utils";

// Se importa el componente para el icono del carrito
import CartIcon from "../cartIcon/CartIcon";

// Se importa el CartDropDown
import CartDropDown from "../cartDropDown/CartDropDown";

import RootReducer from "../../redux/RootReducer";
import userReducer from "../../redux/user/UserReducer";

// Se destructturing de las props de este mismo componente (ya que ahora es un High Order Component ) por que
// se utilizo la funcion connect de react-redux
function Header({ currentUser, hidden }) {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>

      <div className="options">
        <Link className="option" to="/shop">
          Shop
        </Link>
        <Link className="option" to="/shop">
          Contact
        </Link>

        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
        {hidden ? null : <CartDropDown />}
      </div>
    </div>
  );
}

// Con esta funcion permite el acceso al estado general (RootRedcer)
// se hace destructuring de los objetos que se desean obtener y los valores de esos objetos
const mapsStateToProp = ({ user: { currentUser }, cart: { hidden } }) => ({
  // Como es una arrow function se regresan por default estos objetos
  currentUser,
  hidden
});

// Finalmete se exporta el componente como un highOrderCommponent
export default connect(mapsStateToProp)(Header);
