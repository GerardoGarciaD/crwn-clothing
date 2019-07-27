// Estos selectores son importantes ya que son utilizados para mejorar el rendiemiento de la
// pagina,ya que si se actualiza el estado y los componentes no utilizan la nueva informacioin, entonces no se vuelven a cargar
import { createSelector } from "reselect";

// Se selecciona una pequeña parte del estado, en este caso se selecciona el objeto cart
const selectCart = state => state.cart;

// Aqui se seleccionan los items del carrito
export const selectCartItems = createSelector(
  // se hace referencia a la variable selectCart que contiene todo el carrito
  [selectCart],
  //   se seleccionan todos los items
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

// Se seleccionan o se cuentan todos los items del carrito
export const selectCartItemsCount = createSelector(
  // se hace referencia a la variable que contiene los items del carrito
  [selectCartItems],
  //   Se cuentan los elementos del carrito  utilizando reduce
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

// Se seleccionan o se cuentan todos los items del carrito
export const selectCartTotal = createSelector(
  // se hace referencia a la variable que contiene los items del carrito
  [selectCartItems],
  //   Se cuentan los elementos del carrito  utilizando reduce
  cartItems =>
    cartItems.reduce(
      (accumalatedTotal, cartItem) =>
        accumalatedTotal + cartItem.quantity * cartItem.price,
      0
    )
);
