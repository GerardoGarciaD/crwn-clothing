import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Funcion para "envolver" la aplicacion para que pueda ser guardada de forma local
import { PersistGate } from "redux-persist/integration/react";

// Se importa el provider de react-redux, esto permite dar acceso a la informacion del estado a todos los componentes
import { Provider } from "react-redux";

// Se importa el broswer router
import { BrowserRouter } from "react-router-dom";

// se obtiene toda la informacion para el proyecto y se manda como prop
import { store, persistor } from "./redux/Store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
