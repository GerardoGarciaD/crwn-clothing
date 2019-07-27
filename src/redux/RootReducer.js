// Aqui se combinan todos los reducers
import { combineReducers } from "redux";

// Se importa la funcion poder hacer un reducer que pueda almacenar la informacion en el navegador
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

// Se configura como es que se decea guardar la informacion
// es un objeto que va a guardar la informacion en el navegador

// Se importan los reducers del usuairo y el carrito
import userReducer from "./user/UserReducer";
import cartReducer from "./cart/CartReducer";

const persistConfig = {
  key: "root",
  storage,
  // Se guardan cuales reducers se quieren guardat
  whitelist: ["cart"]
};

// Se crea el reducer principal que contiene todos los reducers creados
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

// Se exporta el reducer principal asi como la configuracion de la informmacion que se
// desea guardar
export default persistReducer(persistConfig, rootReducer);
