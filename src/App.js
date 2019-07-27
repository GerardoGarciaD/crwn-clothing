import React from "react";

import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignInUp from "./pages/signInUp/SignInUp";
import CheckoutPage from "./pages/checkout/CheckoutPage";

// Se importa el objeto para autenticar con google
import { auth, createUserProfileDocument } from "./firebase/Firebase.utils";

// Se importa el componente Route
import { Route, Switch, Redirect } from "react-router-dom";

// se importa la funcion que crea High Order Components
import { connect } from "react-redux";

// Se obtiene la funcion (accion) para crear un nuevo usuario
import { setCurrentUser } from "./redux/user/UserActions";

// Esta funcion permite mandar el state a cada selector de manera automatica
import { createStructuredSelector } from "reselect";

// se importa el selector para obtener el usuario actual
import { selectCurrentUser } from "./redux/user/UserSelectors";

class App extends React.Component {
  // "Variable"  con valor nulo  como "bandera" o valor por default
  unsuscribeFromAuth = null;

  // Se crea un lyfeCycledMethod para iniciar sesion
  componentDidMount() {
    // Se hace destructuring de las props que se mandan desde el high order component(connect(null,mapDispatchToProps)(App))
    // en este caso el la action setCurrentUser
    const { setCurrentUser } = this.props;
    // La variable this.unsuscribeFromAuth se iguala a la funcion para iniciar sesion
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // se obtiene la referencia del usuario
        const userRef = await createUserProfileDocument(userAuth);

        // Se obtiene la informacion del usuario usando snapShot

        userRef.onSnapshot(snapShot => {
          // Se manda a llamar la accion setCurrentUser que pasa como parametro un objeto con la informacion para un nuevo usuario (user)
          // en el archivo UserActions
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      // En caso de que se userAuth se tiene un valor de nulo se llama a la accion setCurrentUser para devolver el valor null del user
      else {
        setCurrentUser(userAuth);
      }

      // console.log(user);
    });
  }

  // Se crea un lyfeCycledMethod para mantener la sesion iniciada (cuando se desmonta el componente )
  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  render() {
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
              this.props.currentUser ? <Redirect to="/" /> : <SignInUp />
            }
          />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

// Se obtiene el usuario que esta logueado desde el State de Redux
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  // Aqui se regresa un objeto, el cual consta de una funcion con el parametro user, en donde dispatch siempre espera como parametro una accion
  // en esa accion se manda como parametro el mismo usuario (user) para modificar el estado (RootReducer)
  setCurrentUser: user => dispatch(setCurrentUser(user))
  // en este caso setCurrentUser es el objeto que se va a mandar a todos los componentes
});

// Se exporta el componente como high order component

// En connect, el primer parametro son las props que se obtienen del estado
export default connect(
  mapStateToProps,
  // En el segundo parametro se manda la accion setCurrentUser, que es la accion que será mandada como prop y utilizada en todos los componentes
  mapDispatchToProps
)(App);
