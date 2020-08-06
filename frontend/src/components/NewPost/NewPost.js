import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./NewPost.css";
import * as actionTypes from "../../store/actions/actionTypes";
import { useDispatch } from "react-redux";

// styles
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// styles

function NewPost() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [file, setfile] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(actionTypes.createPost(file, caption));
  };
  return (
    <div>
      <img
        onClick={handleOpen}
        src="https://img.icons8.com/material-outlined/24/000000/add.png"
        alt="new-post"
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className="newpost__form">
              <h2 id="transition-modal-title">New Post</h2>
              <textarea
                placeholder="enter caption"
                onChange={(event) => {
                  setCaption(event.target.value);
                }}
              />
              <input
                type="file"
                onChange={(event) => {
                  setfile(event.target.files[0]);
                }}
              />
              <button onClick={handleSubmit}>Post</button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default NewPost;
