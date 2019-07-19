import React from "react";

import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignInUp from "./pages/signInUp/SignInUp";

// Se importa el componente Route
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInUp} />
      </Switch>
    </div>
  );
}

export default App;
