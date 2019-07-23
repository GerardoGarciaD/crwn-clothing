import React from "react";

import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignInUp from "./pages/signInUp/SignInUp";

// Se importa el objeto para autenticar con google
import { auth, createUserProfileDocument } from "./firebase/Firebase.utils";

// Se importa el componente Route
import { Route, Switch } from "react-router-dom";
import { getDefaultWatermarks } from "istanbul-lib-report";

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
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // se obtiene la referencia del usuario
        const userRef = await createUserProfileDocument(userAuth);

        // Se obtiene la informacion del usuario usando snapShot
        userRef.onSnapshot(snapShot => {
          // Se actualiza el estado
          this.setState({
            currentUser: {
              // Se guarda el id con el id del snaphsot
              id: snapShot.id,
              // y se hace spread operator de la demas inofrmaicon del snapshot
              ...snapShot.data()
            }
          });
          console.log(this.state);
        });
      }
      // En caso de que se userAuth se tiene un valor de nulo se guarde ese  valor en el estado (null)
      else {
        this.setState({ currentUser: userAuth });
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
