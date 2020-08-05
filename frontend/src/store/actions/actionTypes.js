import * as actionTypes from "./actions";
import axios from "../../utils/axios";

export const checkTokenValidity = (expirationDate) => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationDate * 1000);
};

export const authLogin = (username, password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const response = await axios.post(`/auth/login`, {
      username,
      password,
    });
    const token = response.data;
    dispatch(authSuccess(token));
    localStorage.setItem("access_token", token);

    const expirationDate = new Date(new Date().getTime() + 1000 * 3600);
    localStorage.setItem("expiration_date", expirationDate);
    dispatch(checkTokenValidity(3600));
  } catch (error) {
    dispatch(authFail(error.response.data.error));
  }
};

export const authRegister = (email, username, password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const response = await axios.post(`/auth/register`, {
      email,
      username,
      password,
    });
    const token = response.data;
    localStorage.setItem("access_token", token);
    dispatch(authSuccess(token));
  } catch (error) {
    dispatch(authFail(error.response.data.error));
  }
};
export const authStart = () => (dispatch) => {
  dispatch(clearErrors());

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
  if (!token || token === "null") {
    dispatch(authLogout());
  }

  const expirationDate = new Date(localStorage.getItem("expiration_date"));

  if (expirationDate <= new Date()) {
    dispatch(authLogout());
  } else {
    dispatch(authSuccess(token));
    dispatch(
      checkTokenValidity(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      )
    );
  }
};

export const gettingPosts = () => async (dispatch) => {
  const token = localStorage.getItem("access_token");

  if (!token || token === "null") {
    dispatch(authLogout());
  }

  try {
    const response = await axios.get(`/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  let payload;
  console.log(error);
  if (error.response) {
    payload =
      error.response.status === 401
        ? "Please Login"
        : error.response.data.error;
  }
  payload = "Something went wrong on our side. Please try again!";

  return {
    type: actionTypes.GET_POSTS_ERROR,
    payload,
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

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};
