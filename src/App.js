import React from "react";

import "./App.css";
import HomePage from "./pages/homepage/HomePage";

// Se importa el componente Route
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
