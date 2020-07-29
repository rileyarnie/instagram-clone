import React from "react";
import "./Navigation.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="navigation__navigation">
        <nav className="navigation_nav">
          <div className="navigation__logo">
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </div>
          <div className="navigation__search">
            <input placeholder="search" />
          </div>
          <div className="navigation__navLinks">
            <ul className="navigation_nav-Items">
              <li className="navigation_nav-Item">
                <img
                  src="https://img.icons8.com/ios-filled/24/000000/home.png"
                  alt="home"
                />
              </li>
              <li className="navigation_nav-Item">
                <img
                  src="https://img.icons8.com/ios/24/000000/sent.png"
                  alt="messages"
                />
              </li>
              <li className="navigation_nav-Item">
                <img src="https://img.icons8.com/ios/24/000000/user.png" />
              </li>

              <li className="navigation_nav-Item">Logout</li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
