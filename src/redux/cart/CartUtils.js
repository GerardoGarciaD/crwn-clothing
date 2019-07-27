// En este archivo se van a crear funciones que pueden ser utilizadas al momento de agregar informacion a los reducers

export const addItemToCart = (cartItems, cartItemToAdd) => {
  // Se busca si el nuevo item que se quiere agregar, existe con anterioridad
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  //   Si, sí existe entonces se ejecuta este if
  if (existingCartItem) {
    //   en donde se recorren todos los items existentes del carrito
    return cartItems.map(cartItem =>
      // si el id del nuevo item coincide con el de un item que existe con anterioridad, entonces se le suma
      // 1 a la cantidad de ese item
      cartItem.id === cartItemToAdd.id
        ? //   Si coincide se regresa todo todo el item, pero se suma la cantidad en 1
          { ...cartItem, quantity: cartItem.quantity + 1 }
        : // si el id no coincide se regresa el item sin modificar
          cartItem
    );
  }

  //   Si no existe el item en el carrito, entonces se regresa los items que ya estaban en el carrito
  //   pero ademas se ingresa el nuevo item, con la nueva propiedad quantity
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

// Funcion para restar los items y eliminar el item del carrito una unidad
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
