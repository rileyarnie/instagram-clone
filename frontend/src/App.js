import React, { useEffect } from "react";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import Post from "./components/Post/Post";
import * as actionTypes from "./store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  const error = useSelector((state) => state.postReducer.error);

  useEffect(() => {
    dispatch(actionTypes.gettingPosts());
    toast.error(error);
  }, [dispatch, error]);

  return (
    <div>
      <Navigation />
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
        posts.map((post) => (
          <Post
            caption={post.caption}
            creator={post.creator}
            imageUrl={post.imageUrl}
            key={post._id}
            _id={post._id}
            comments={post.comments}
          />
        ))
      )}
    </div>
  );
}

export default App;
