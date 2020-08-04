import React from "react";
import Post from "../Post/Post";
import { useSelector } from "react-redux";

const PostList = () => {
  const posts = useSelector((state) => state.postReducer.posts);
  //   const posts = useSelector((state) => state.postReducer.posts);
  return (
    <div>
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
