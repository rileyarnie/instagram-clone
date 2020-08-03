import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

const Post = ({ comments, creator, caption, imageUrl }) => {
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__creator">
          <Avatar alt="Riley" src="profilepic"></Avatar>
          <p className="post__username">{creator.username}</p>
        </div>
        <div className="post__options">
          <img
            src="https://img.icons8.com/ios-filled/24/000000/more.png"
            alt="post"
          />
        </div>
      </div>
      <div className="post__body">
        <img className="post__image" src={imageUrl} alt="oy" />

        {caption ? (
          <div className="post__comments">
            <p className="post__comment">
              <span className="post__comment-username">{creator.username}</span>{" "}
              {caption}
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="post__comments">
          <p className="post__comments_title">comments</p>
          {comments.map((comment) => (
            <p className="post__comment" key={comment._id}>
              <span className="post__comment-username">
                {comment.author.username}
              </span>{" "}
              {comment.content}
            </p>
          ))}
          {/* <p className="post__comment">
            <span className="post__comment-username">Username</span> Lorem ipsum
            dolor sit amet, consectetur adipiscing elitconsectetur adipiscing
            elitconsectetur adipiscing elit
          </p> */}
        </div>
      </div>
      <div className="post__footer">
        <form className="post__form">
          <input className="post__input" placeholder="Add a comment..." />
          <button className="post__button">Post</button>
        </form>
      </div>
    </div>
  );
};

export default Post;
