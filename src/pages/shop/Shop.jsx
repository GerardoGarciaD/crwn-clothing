import React, { Component } from "react";
import CollectionsOverview from "../../components/collectionsOverview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";

import { connect } from "react-redux";

import { updateCollections } from "../../redux/shop/ShopActions";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/Firebase.utils";

import { Route } from "react-router-dom";

// Se obtiene la propiedad match, que se obtiene directamente desde el archivo App.js mediante route
// en donde Route envia por defecto los parametros match, history y location
class Shop extends Component {
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
      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        {/* match.path obtiene la el url exacto de la pagina que se esta desplegando ('/shop', '/cart', etc) */}
        <Route exact path={`${match.path}`} component={CollectionsOverview} />

        {/* Para desplegar cada categoria de productos (hats, sneakers, etc.), primero se escribe la ubicacion actual con 
      match.path y :categoryId se obtiene de la url ('shop/hats', 'shop/sneakers') y se manda como parametro para mostrar la pagina adecauda */}
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(
  null,
  mapDispatchToProps
)(Shop);
