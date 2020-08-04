import React, { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Post from "./components/Post/Post";
import * as actionTypes from "./store/actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Route, Switch } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PostList from "./components/PostList/PostList";

function App() {
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.postReducer.posts);
  const error = useSelector((state) => state.postReducer.error);

  useEffect(() => {
    dispatch(actionTypes.gettingPosts());
    toast.error(error);
  }, [dispatch, error]);

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
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/">
          <Navigation />
          <PostList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
