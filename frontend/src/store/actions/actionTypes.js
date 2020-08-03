import * as actionTypes from "./actions";
import axios from "../../utils/axios";

export const gettingPosts = () => async (dispatch) => {
  try {
    const response = await axios.get("/posts");
    dispatch(getPosts(response.data.posts));
  } catch (error) {
    console.log(error);
  }
  dispatch(getPosts);
};

export const getPosts = (posts) => {
  return {
    type: actionTypes.GET_POSTS,
    payload: posts,
  };
};
