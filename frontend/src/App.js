import React, { useEffect } from "react";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navigation from "./components/Navigation/Navigation";
import * as actionTypes from "./store/actions/actionTypes";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PostList from "./components/PostList/PostList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionTypes.checkAuthState());
  }, [dispatch]);

  return (
    <div>
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
