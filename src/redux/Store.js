// Aqui es donde se va a generar toda la informacion para todo el proyecto

import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

// se importa el reducer que contiene todos los reducers
import rootReducer from "./RootReducer";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
