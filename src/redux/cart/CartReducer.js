// Se importan todas las acciones que existan en CartTypes
import CartActionTypes from "./CartTypes";

import { addItemToCart, removeItemFromCart } from "./CartUtils";

// Se importa la funcion que verifica si un producto ya estaba en el carrito o no

const INITIAL_STATE = {
  hidden: true,

  // Array vacio que contendrá los items en el carrito
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };

    case CartActionTypes.ADD_ITEM:
      return {
        // Se regresa el estado "anterior" con toda la informacion que ya estaba antes
        ...state,
        // y se guarda el objeto cartItems con el nuevo valor que se ingresa en el reducer
        // Aqui se manda a llamar la funcion que verifica si ya existe un item en especifico en el carrito
        cartItems: addItemToCart(state.cartItems, action.payload)
      };

    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };

    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
        )
      };

    default:
      return state;
  }
};

export default cartReducer;
