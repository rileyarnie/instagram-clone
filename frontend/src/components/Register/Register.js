import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const error = useSelector((state) => state.authReducer.error);
  const loading = useSelector((state) => state.authReducer.loading);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(actionTypes.authRegister(email, username, password));
  };

  return (
    <div className="register">
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
      <div className="register__form">
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
            <div className="register__logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/200px-Instagram_logo.svg.png"
                alt=""
              />
            </div>
            <form className="register__inputs">
              <input
                placeholder="username"
                className="register__formInput"
                type="text"
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                placeholder="email"
                className="register__formInput"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                placeholder="password"
                className="register__formInput"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="submit"
                className="register__login"
                onClick={(event) => handleSubmit(event)}
              >
                Register
              </button>
            </form>
          </>
        )}
      </div>
      {loading ? (
        ""
      ) : (
        <div className="register_loginLink">
          <p>
            Already have an account?{" "}
            <Link className="register__link" to="/login">
              Log In
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
