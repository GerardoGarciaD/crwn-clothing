// Aqui es donde se va a generar toda la informacion para todo el proyecto

import { createStore, applyMiddleware } from "redux";

// Se importa la funcion para poder guardar la informacion de manera local en el navegador
import { persistStore } from "redux-persist";
import logger from "redux-logger";

// se importa el reducer que contiene todos los reducers
import rootReducer from "./RootReducer";

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Se crea una version de la informacion que podrá ser guardada en el navegador
export const persistor = persistStore(store);

export default { store, persistor };
