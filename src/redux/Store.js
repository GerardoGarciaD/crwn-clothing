// Aqui es donde se va a generar toda la informacion para todo el proyecto

import { createStore, applyMiddleware } from "redux";

// Se importa la funcion para poder guardar la informacion de manera local en el navegador
import { persistStore } from "redux-persist";
import logger from "redux-logger";

// Se importa funcion para crear el middleware para utilizar sagas
import createSagaMiddleware from "redux-saga";
// se importa el reducer que contiene todos los reducers
import rootReducer from "./RootReducer";
// Se importa el el file rootSaga que contiene todas las sagas
import rootSaga from "./RootSaga";

// Se crea el middleware para utilizar sagas
const sagaMiddleWare = createSagaMiddleware();

// import thunk from "redux-thunk";

// Se añade el middleware al array de middlewares
const middlewares = [logger, sagaMiddleWare];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Se ejecuta el middleware con todas las sagas
sagaMiddleWare.run(rootSaga);

// Se crea una version de la informacion que podrá ser guardada en el navegador
export const persistor = persistStore(store);

export default { store, persistor };
