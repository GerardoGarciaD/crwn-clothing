// Se importan las acciones del usuario
import { UserActionTypes } from "./UserTypes";

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});
