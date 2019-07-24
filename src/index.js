import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Se importa el provider de react-redux
import { Provider } from "react-redux";

// Se importa el broswer router
import { BrowserRouter } from "react-router-dom";

// se obtiene toda la informacion para el proyecto y se manda como prop
import store from "./redux/Store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
