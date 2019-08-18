import ShopActionTypes from "./ShopTypes";

// Se importan las funciones relacionadas con firebase
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/Firebase.utils";

// Esta es la primer accion que se realiza cuando se empieza a obtener la informacion desde firebase
// esta accion solo cambia el valor de la "variable" que se encarga de verificar si se muestra la loading page o no (del estado del shopReducer)
export const fetchCollectionStart = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

// Esta se efectua cuando se termina de obtener la informacion desde firebase y actualiza el estado del shopReducre, añadiendo los productos de la
// tienda
export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

// Esta accion se ejectua solo si existe un error al momento de obtener la informacion de firebase
export const fetchCollectionFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// Esta es la accion que se manda a llamar desde el componente Shop, es una funcion "asincrona" ya que mientras que el componente se carga o se crea
// (componentDidMount), se manda a llamar a la accion y a su vez se ejecutan las acciones de arriba consecuentemente,
// !!!Esta accion se manda a llamar directamente como funcion y regresa ningun objeto en el componente que se manda a llamar, esto se puede realizar
// gracias a la libreria thunk
export const fetchCollectionStartAsync = () => {
  return dispatch => {
    // Se obtiene la referencia de la "tabla", de firebase
    const collectionRef = firestore.collection("collections");

    // Una vez que se obtiene la refencia de la "tabla" se llama la accion para que empiece la pantalla de carga (loading page)
    dispatch(fetchCollectionStart());

    // Se hace el request o llamado para obtener la informmacion de firebase,
    collectionRef
      .get()
      .then(snapshot => {
        // Se obtienen cada uno de los productos de firebase con la funcion convertCollectionsSnapshotToMap
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        // Una vez que se obtienen todos los productos, se llama a la accion fetchCollectionsSuccess, actualiza el estado con los productos
        // y tambien la variable que se encara de mostrar la loading page, para que esta no se muestre más
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })

      // Finalmente se llama esta funcion en caso de que exista algun error
      .catch(error => dispatch(fetchCollectionFailure(error.message)));
  };
};

// !!Todas estas acciones se ejecutan directamente con  dispatch por que se utiliza la libreria thunk
