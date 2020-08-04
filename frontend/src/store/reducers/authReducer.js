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
      return { ...state, loading: true };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return { ...state, error: action.payload };
    case actionTypes.AUTH_LOGOUT:
      return state;

    default:
      return state;
  }
};
