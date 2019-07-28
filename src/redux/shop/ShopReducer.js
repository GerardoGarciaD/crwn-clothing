// Se importa la informacion inicial de la tienda
import SHOP_DATA from "./ShopData";

// Se inicializa el estado con la informacion obtenida
const INITIAL_STATE = {
  collections: SHOP_DATA
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shopReducer;
