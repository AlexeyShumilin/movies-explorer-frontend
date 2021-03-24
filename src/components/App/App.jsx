import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./App.css";
import Movies from "../Movies/Movies";

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
      </Switch>
    </div>
  );
}

export default App;
