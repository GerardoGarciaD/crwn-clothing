import React from "react";
import CustomButton from "../customButon/CustomButton";

// Se obtiene la funcion para poder crear high order componets y hacer uso del state
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

// Esta funcion permite mandar el state a cada selector de manera automatica
import { createStructuredSelector } from "reselect";

import "./CartDropDown.scss";
import CartItem from "../cartItem/CartItem";

// Se importa el selector para obtener todos los elementos del carrito
import { selectCartItems } from "../../redux/cart/CartSelectors";

// Se importa la accion para cerrar la "ventana" del carrito
import { toggleCartHidden } from "../../redux/cart/CartActions";

// Se hace destructuring del elemento que se quiere obtener del stado cuando se crea el  mapStateToProps

// Se obtiene tambien la prop dispatch que es la que se encarga de llamar la accion(toggleCartHidden)
function CartDropDown({ cartItems, history, dispatch }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      {/* Se redirecciona a la pagina de checkout con history */}
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        Go To Checkout
      </CustomButton>
    </div>
  );
}

// Se obtiene la informacion del store
// Se hace destructuring de la informacion,  en donde se obtiene el objeto cart y a su ves hace destructuring
// para obtener el objeto cartItems
const mapStateToProps = createStructuredSelector({
  // Se regresa el objeto cartItems
  cartItems: selectCartItems
});

// Se "envuelve" el high order component en withRouter para poder obtener la prop history y asi
// redireccionar a las paginas

// el dispatch se envia automaticamente al al componente por lo que se puede obtener como prop y llamar
// la accion directamente en el componente
export default withRouter(connect(mapStateToProps)(CartDropDown));
