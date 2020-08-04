import * as actionTypes from "./actions";
import axios from "../../utils/axios";

export const authLogin = (username, password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const token = await axios.post("/auth/login", { username, password });
    localStorage.setItem("access_token", token);
    dispatch(authSuccess(token));
  } catch (error) {
    dispatch(authFail(error.response.data.error));
  }
};

export const authRegister = (email, username, password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const token = await axios.post("/auth/register", {
      email,
      username,
      password,
    });
    localStorage.setItem("access_token", token);
    dispatch(authSuccess(token));
  } catch (error) {
    dispatch(authFail(error.response.data.error));
  }
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};
export const authLogout = () => {
  localStorage.removeItem("access_token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    dispatch(authSuccess(token));
  }
  dispatch(authLogout());
};

export const gettingPosts = () => async (dispatch) => {
  try {
    const response = await axios.get("/posts");
    dispatch(getPosts(response.data.posts));
  } catch (error) {
    dispatch(getPostsError(error));
  }
};

export const getPosts = (posts) => {
  return {
    type: actionTypes.GET_POSTS,
    payload: posts,
  };
};

export const getPostsError = (error) => {
  return {
    type: actionTypes.GET_POSTS_ERROR,
    payload:
      error.response.status === 401
        ? "Please Login"
        : error.response.data.error,
  };
};

export const postComment = (postId, content) => async (dispatch) => {
  try {
    await axios.post(`/comments/${postId}/create-comment`, {
      content,
    });
    return {
      type: actionTypes.POST_COMMENT,
    };
  } catch (error) {
    console.log(error);
  }
};
