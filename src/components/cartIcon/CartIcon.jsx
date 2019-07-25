import React from "react";
import { connect } from "react-redux";

// Se importa la accion que esta relacionada con el Carrito
import { toggleCartHidden } from "../../redux/cart/CartActions";

// Se importa el icono
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./CartIcon.scss";

// Se reciben las props, que en este caso son las que se mandan de este mismp componente (High Order Component)
function CartIcon({ toggleCartHidden }) {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}

// Se crea una variable que consta de una funcion en donde se genera un objeto a partir del resultado
// de la accion toggleCartHidden()
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

// Se crea el high order component en donde se envian las props
export default connect(
  null,
  mapDispatchToProps
)(CartIcon);
