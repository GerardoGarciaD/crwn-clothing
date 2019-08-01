// Se importa la informacion inicial de la tienda
import SHOP_DATA from "./ShopData";
import ShopActionTypes from "./ShopTypes";

// Se inicializa el estado con la informacion obtenida
const INITIAL_STATE = {
  collections: SHOP_DATA
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Listening para la accion que actualiza el objeto collections del estado
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };
    default:
      return state;
  }
};

export default shopReducer;
