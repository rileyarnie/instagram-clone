import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";

const Login = () => {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector((state) => state.authReducer.error);
  const loading = useSelector((state) => state.authReducer.loading);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    isAuthenticated ? history.push("/") : history.push("/login");
  }, [isAuthenticated, history]);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(actionTypes.authLogin(username, password));
  };

  return (
    <div className="login">
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
      <div className="login__form">
        {loading ? (
          <>
            <p>Authenticating...</p>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </>
        ) : (
          <>
            <div className="login__logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/200px-Instagram_logo.svg.png"
                alt=""
              />
            </div>
            <form className="login__inputs">
              <input
                onChange={(event) => setUserame(event.target.value)}
                placeholder="username"
                className="login__formInput"
                type="text"
              />
              <input
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password"
                className="login__formInput"
                type="password"
              />
              <button
                // disabled
                type="submit"
                className="login__login"
                onClick={(event) => handleSubmit(event)}
              >
                Log In
              </button>
            </form>
          </>
        )}
      </div>
      {loading ? (
        ""
      ) : (
        <div className="login_loginLink">
          <p>
            Don't have an account?
            <Link className="register__link" to="/register">
              Register
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
