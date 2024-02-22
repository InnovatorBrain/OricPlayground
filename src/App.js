// App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import AuthService from "./services/auth.service";
import Navbar from "./components/Navbar/Navbar";
import EventBus from "./common/EventBus";

// Components
import Slides from "./components/Slides/Slides";
import Prices from "./components/Prices/Prices";
import Login from "./components/Login";
import PlaygroundCon from "./container/PlaygroundCon/PlaygroundCon";
import Register from "./components/Register";
import Footer from "./components/Footer/Footer";
import FeatureSec from "./components/FeatureSec/FeatureSec";
import Marq from "./components/Marquee/Marq";
import Products from "./components/Products/Products";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <>
      <Navbar
        showModeratorBoard={showModeratorBoard}
        showAdminBoard={showAdminBoard}
        currentUser={currentUser}
        logOut={logOut}
      />
      <Routes>
        <Route
          exact
          path={""}
          element={<><Slides /> <FeatureSec /> <Prices /> <Marq /><Footer /></>}
        />
        <Route
          exact
          path={"/home"}
          element={<><Slides /> <FeatureSec /> <Prices /> <Marq /><Footer /></>}
        />
        <Route exact path={"/products"} element={<><Products /></>} />
        <Route path="/prices" element={<><Prices /> <Footer /> </>} />
        <Route path="/nlp" element={<><PlaygroundCon /></>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
      </Routes>
    </>
  );
};

export default App;
