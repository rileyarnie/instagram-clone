import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login__form">
        <div className="login__logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/200px-Instagram_logo.svg.png"
            alt=""
          />
        </div>
        <form className="login__inputs">
          <input
            placeholder="username"
            className="login__formInput"
            type="text"
          />
          <input
            placeholder="password"
            className="login__formInput"
            type="password"
          />
          <button type="submit" className="login__login">
            Log In
          </button>
        </form>
      </div>
      <div className="login_loginLink">
        <p>
          Don't have an account?
          <Link className="register__link" to="/register">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
