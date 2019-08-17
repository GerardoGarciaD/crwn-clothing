import { takeLatest, call, put, all } from "redux-saga/effects";
import ShopActionTypes from "./ShopTypes";

// Se importan las funciones relacionadas con firebase
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/Firebase.utils";

// Se importan las acciones para la obtencion de datos de firebase
import { fetchCollectionsSuccess, fetchCollectionFailure } from "./ShopActions";

export function* fetchCollectionsAsync() {
  try {
    // Se obtiene la referencia de la colleccion (tabla de firebase)
    const collectionRef = firestore.collection("collections");

    // se obtiene la informacion de la tabla
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error.message));
  }
}

// Se escucha la accion y se toma la ultima accion FETCH_COLLECTIONS_START y se ejecuta la funcion que obtiene la informacion
// de firebase
export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
