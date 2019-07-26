import React from "react";
import CustomButton from "../customButon/CustomButton";

// Se obtiene la funcion para poder crear high order componets y hacer uso del state
import { connect } from "react-redux";

import "./CartDropDown.scss";
import CartItem from "../cartItem/CartItem";

// Se importa el selector para obtener todos los elementos del carrito
import { selectCartItems } from "../../redux/cart/CartSelectors";

// Se hace destructuring del elemento que se quiere obtener del stado cuando se crea el  mapStateToProps
function CartDropDown({ cartItems }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <CustomButton>Go To Checkout</CustomButton>
    </div>
  );
}

// Se obtiene la informacion del store
// Se hace destructuring de la informacion,  en donde se obtiene el objeto cart y a su ves hace destructuring
// para obtener el objeto cartItems
const mapStateToProps = state => ({
  // Se regresa el objeto cartItems
  cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropDown);
