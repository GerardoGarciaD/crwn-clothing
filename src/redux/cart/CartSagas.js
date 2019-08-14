import { all, call, takeLatest, put } from "redux-saga/effects";
import UserActionTypes from "../user/UserTypes";
import { clearCart } from "./CartActions";

// Se ejecuta la accion para vaciar el carrito
export function* clearCartOnSignOut() {
  // Se debe poner put antes de la accion para que se regrese al flujo normal de redux
  yield put(clearCart());
}

// Funcion que escucha la ultima accion SIGN_OUT_SUCCES y despues ejecuta la funcion para vaciar el carrito
export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCES, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
