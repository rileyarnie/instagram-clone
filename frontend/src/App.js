import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Post from "./components/Post/Post";

function App() {
  return (
    <div>
      <Navigation />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;
