import React from "react";

import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignInUp from "./pages/signInUp/SignInUp";

// Se importa el objeto para autenticar con google
import { auth } from "./firebase/Firebase.utils";

// Se importa el componente Route
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  // "Variable"  con valor nulo  como "bandera" o valor por default
  unsuscribeFromAuth = null;

  // Se crea un lyfeCycledMethod para iniciar sesion
  componentDidMount() {
    // La variable this.unsuscribeFromAuth se iguala a la funcion para iniciar sesion
    this.unsuscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  // Se crea un lyfeCycledMethod para mantener la sesion iniciada (cuando se desmonta el componente )
  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
