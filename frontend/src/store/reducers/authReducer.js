import * as actionTypes from "../actions/actions";

const initialState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: action.payload,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: null,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
