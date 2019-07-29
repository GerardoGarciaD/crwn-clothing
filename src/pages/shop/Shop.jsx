import React from "react";

import CollectionsOverview from "../../components/collectionsOverview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";

import { Route } from "react-router-dom";

// Se obtiene la propiedad match, que se obtiene directamente desde el archivo App.js mediante route
// en donde Route envia por defecto los parametros match, history y location
export default function Shop({ match }) {
  return (
    <div className="shop-page">
      {/* match.path obtiene la el url exacto de la pagina que se esta desplegando ('/shop', '/cart', etc) */}
      <Route exact path={`${match.path}`} component={CollectionsOverview} />

      {/* Para desplegar cada categoria de productos (hats, sneakers, etc.), primero se escribe la ubicacion actual con 
      match.path y :categoryId se obtiene de la url ('shop/hats', 'shop/sneakers') y se manda como parametro para mostrar la pagina adecauda */}
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
}
