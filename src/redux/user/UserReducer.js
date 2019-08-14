// Se importan las acciones del usuario
import UserActionTypes from "./UserTypes";

// Se crea el estado inicial
const INITIAL_STATE = {
  currentUser: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };

    case UserActionTypes.SIGN_OUT_SUCCES:
      return {
        ...state,
        currentUser: null,
        error: null
      };

    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
