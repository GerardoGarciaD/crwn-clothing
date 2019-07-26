import React from "react";
import { connect } from "react-redux";

// Se importa la accion que esta relacionada con el Carrito
import { toggleCartHidden } from "../../redux/cart/CartActions";

// se importa el selector para obtener el numero total de elementos en el carrito
import { selectCartItemsCount } from "../../redux/cart/CartSelectors";

// Se importa el icono
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./CartIcon.scss";

// Se reciben las props, que en este caso son las que se mandan de este mismp componente (High Order Component)
function CartIcon({ toggleCartHidden, itemCount }) {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
}

// Se crea una variable que consta de una funcion en donde se genera un objeto a partir del resultado
// de la accion toggleCartHidden()
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

// Se crea esta funcion para obtener el numero total de items en el carrito
// se pasa como parametro todo el estado, ya que se utilizan selectors y se debe pasar todo el estado
const mapStateToProps = state => ({
  // Se regresa el numero de items usando el selector "selectCartItemsCount"
  itemCount: selectCartItemsCount(state)
});

// Se crea el high order component en donde se envian las props
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
