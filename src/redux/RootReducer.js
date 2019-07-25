// Aqui se combinan todos los reducers
import { combineReducers } from "redux";

import userReducer from "./user/UserReducer";
import cartReducer from "./cart/CartReducer";

// se devuelve el objeto user con el valor de userReducer
export default combineReducers({
  user: userReducer,
  cart: cartReducer
});
