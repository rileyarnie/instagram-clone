import React from "react";
import "./App.css";
import Avatar from "@material-ui/core/Avatar";

function App() {
  return (
    <div className="app">
      <div className="app__navigation">
        <nav className="app_nav">
          <div className="app__logo">
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </div>
          <div className="app__search">
            <input placeholder="search" />
          </div>
          <div className="app__navLinks">
            <ul className="app_navItems">
              <li className="app_navItem">
                <img
                  src="https://img.icons8.com/ios-filled/24/000000/home.png"
                  alt="home"
                />
              </li>
              <li className="app_navItem">
                <img
                  src="https://img.icons8.com/ios/24/000000/sent.png"
                  alt="messages"
                />
              </li>
              <li className="app_navItem">
                <img src="https://img.icons8.com/ios/24/000000/user.png" />
              </li>

              <li className="app_navItem">Logout</li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
