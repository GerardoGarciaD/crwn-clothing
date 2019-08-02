import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// Selector en donde se convierte el un objeto a un array

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // Se obtienen las "llaves" de cada grupo de elementos (hats, sneakers, etc) y apartir de esas llaves
  // es obtienen cada uno de los productos de ese grupo
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

// Esta funcion recibe dos parametros, en donde el primero es el id que se va a buscar
// (hats, sneakers) y el segundo es el estado (state)
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );
