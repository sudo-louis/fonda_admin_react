import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_AUTH_FAILURE,
} from "../Actions/User";

export interface AuthState {
  userInfo: any;
  error: string | null;
}

const initialState: AuthState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
  error: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, userInfo: action.payload, error: null };
    case USER_REGISTER_SUCCESS:
      return { ...state, userInfo: action.payload, error: null };
    case USER_LOGOUT:
      return { ...state, userInfo: null, error: null };
    case USER_AUTH_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
