import React, { useEffect } from "react";

import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignInUp from "./pages/signInUp/SignInUp";
import CheckoutPage from "./pages/checkout/CheckoutPage";

// Se importa el componente Route
import { Route, Switch, Redirect } from "react-router-dom";

// se importa la funcion que crea High Order Components
import { connect } from "react-redux";

// Esta funcion permite mandar el state a cada selector de manera automatica
import { createStructuredSelector } from "reselect";

// se importa el selector para obtener el usuario actual
import { selectCurrentUser } from "./redux/user/UserSelectors";

import { checkUserSession } from "./redux/user/UserActions";

// Se obtienen las props que se reciben desde el highOrderComponent
function App({ checkUserSession, currentUser }) {
  // Se utiliza useEffect, que replica la funcion de component didMount
  useEffect(
    () => {
      // Cuando se renderiza el componente se ejecuta la funcion para verificar el usuario actual
      checkUserSession();
    },
    // El segundo parametro se utiliza para renderizar el componente solo cuando el parametro cambie
    [checkUserSession]
  );
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/signin"
          // Se crea una funcion para redireccionar al inicio si ya se encuntra logueado un usuario
          render={() =>
            // con el operador ternario se verifica si esta logueado para redireccionar las paginas
            currentUser ? <Redirect to="/" /> : <SignInUp />
          }
        />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
}

// Se obtiene el usuario que esta logueado desde el State de Redux
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// Se exporta el componente como high order component
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

// En connect, el primer parametro son las props que se obtienen del estado
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
