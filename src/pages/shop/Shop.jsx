import React, { Component } from "react";
import CollectionsOverview from "../../components/collectionsOverview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";

// Se importa el HOC que recibe como parametro otro componente
import WithSpinner from "../../components/withSpinner/WithSpinner";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

// Se importa la accion asincrona para obtener la informacion de Firebase
import { fetchCollectionStart } from "../../redux/shop/ShopActions";

import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded
} from "../../redux/shop/ShopSelectors";

/* import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/Firebase.utils";
 */
import { Route } from "react-router-dom";

// Se iguala el HOC (WithSpinner) a nuevas variables  y se pasan los componentes como parametro
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// Propiedad match, se obtiene directamente desde el archivo App.js mediante route
// que envia por defecto los parametros match, history y location
class Shop extends Component {
  /*
  // Esta es la "variable" que se utiliza para mostrar la loading page
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

   componentDidMount() {
    const { updateCollections } = this.props;

    // Se obtiene la referencia de la "tabla", de firebase
    const collectionRef = firestore.collection("collections");

    // Aqui se obtiene cada elemento de la "tabla" collection, pero no su informacion, se obtiene su id
    // Se realiza una funcion async por que no sabemos en que momento se vaya a hacer el "llamado" a  la referencia
    collectionRef.onSnapshot(async snapshot => {
      // console.log(snapshot);

      // Se manda a llamar la funcion que convierte este querySnapshot y obtiene la informacion del "documento"
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      // console.log(collectionsMap);
      // Se utiliza la funcion que contiene la accion para actualizar el estado y añadir los items de la tienda
      updateCollections(collectionsMap);

      // Una vez que se obtienen la informacion de firebase y se actualiza el estado, la variable loading cambia a false
      this.setState({ loading: false });
    });
  } */

  componentDidMount() {
    // Se obtiene y se ejecuta la accion asincrona que obtiene los datos
    const { fetchCollectionStart } = this.props;
    fetchCollectionStart();
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
    return (
      <div className="shop-page">
        {/* match.path obtiene la el url exacto de la pagina que se esta desplegando ('/shop', '/cart', etc) */}
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            // Se manda a llamar a las variables creadas en donde se pasan los parametros
            // para el  HOC
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />

        {/* Para desplegar cada categoria de productos (hats, sneakers, etc.), primero se escribe la ubicacion actual con 
      match.path y :categoryId se obtiene de la url ('shop/hats', 'shop/sneakers') y se manda como parametro para mostrar la pagina adecauda */}
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
