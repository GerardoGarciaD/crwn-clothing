import React from "react";

// Se importa la funcion para conectar el componente con el state
// y crear el high order component
import { connect } from "react-redux";

// Se obtienen las acciones para poder crear funciones
import {
  clearItemFromCart,
  addItem,
  removeItem
} from "../../redux/cart/CartActions";
import "./Checkout.scss";

// Se obtienen las props que se mandan desde el componente CheckoutPage asi como las funciones
// que se mandan con la funcion connect (high order component)
function CheckoutItem({ cartItem, clearItem, addItem, removeItem }) {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>

      <span className="price">{price}</span>

      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
}

// Se crean las funciones que seran exportadas, estas funciones llaman a las acciones de redux
const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
