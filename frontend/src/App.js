import React, { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Post from "./components/Post/Post";
import * as actionTypes from "./store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  useEffect(() => {
    dispatch(actionTypes.gettingPosts());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      {posts.map((post) => (
        <Post
          caption={post.caption}
          creator={post.creator}
          imageUrl={post.imageUrl}
          key={post._id}
          comments={post.comments}
        />
      ))}
    </div>
  );
}

export default App;
