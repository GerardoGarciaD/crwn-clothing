import React from "react";
import "./CheckoutPage.scss";

// Se import la funcion que permite crear high order components
import { connect } from "react-redux";
// se importa la funcio que permite mandar el state a todos los selectores
import { createStructuredSelector } from "reselect";
// Se importan los selectores para obtener los items del carrito y el total de dinero
import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/CartSelectors";

import CheckoutItem from "../../components/checkout/CheckoutItem";

// se importan las props del high order component
function CheckoutPage({ cartItems, total }) {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>

        <div className="header-block">
          <span>Description</span>
        </div>

        <div className="header-block">
          <span>Quantity</span>
        </div>

        <div className="header-block">
          <span>Price</span>
        </div>

        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">
        <span>Total: ${total}</span>
      </div>
    </div>
  );
}

// Se obtiene la informacion del state, los objetos resultantes de los selectores (selectCartItems selectCartTotal)
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
