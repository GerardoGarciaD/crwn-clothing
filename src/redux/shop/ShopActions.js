import ShopActionTypes from "./ShopTypes";

// Accion para actualizar el el objeto collections del ShopReducer
// Esta es una funcion que recibe como parametro toda la informacion de los productos
// y regresa los objetos type y payload que son utilizados en el ShopReducer
export const updateCollections = collectionsMap => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap
});
