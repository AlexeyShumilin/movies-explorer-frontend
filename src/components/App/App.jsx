import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <Header bgColor="dark" textColor="white" />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies" exact>
          <Header bgColor="light" textColor="black" />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies" exact>
          <Header bgColor="light" textColor="black" />
          <Movies />
          <Footer />
        </Route>
        <Route path="/profile" exact>
          <Header bgColor="light" textColor="black" />
          <Profile />
        </Route>
        <Route path="/signin" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Register />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
