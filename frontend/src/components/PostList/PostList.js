import React, { useEffect } from "react";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actionTypes from "../../store/actions/actionTypes";
import { useHistory } from "react-router-dom";

const PostList = () => {
  const posts = useSelector((state) => state.postReducer.posts);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.postReducer.error);
  const history = useHistory();

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    isAuthenticated ? history.push("/") : history.push("/login");
  }, [isAuthenticated, history]);

  useEffect(() => {
    dispatch(actionTypes.gettingPosts());
  }, [dispatch]);

  useEffect(() => {
    toast.error(error);
  }, [error]);
  return (
    <div>
      {error ? (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      ) : (
        ""
      )}
      {posts.map((post) => (
        <Post
          caption={post.caption}
          creator={post.creator}
          imageUrl={post.imageUrl}
          key={post._id}
          _id={post._id}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default PostList;
