import * as actionTypes from "../actions/actions";

const initialState = {
  posts: [],
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      return { ...state, posts: action.payload };

    case actionTypes.GET_POSTS_ERROR:
      return { ...state, error: action.payload };

    case actionTypes.POST_COMMENT:
      return { ...state };

    default:
      return state;
  }
};

export default postReducer;
