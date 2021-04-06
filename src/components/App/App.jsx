import React from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import MainApi from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import "./App.css";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";

function App() {
  const history = useHistory();
  const [registrationError, setRegisteredError] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  const handleLogin = (email, password) => {
    MainApi.login(email, password)
      .then((data) => {
        if (data) {
          setIsLogin(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setLoginError(true);
        console.log(err);
      });
  };

  function handleRegister(email, password, name) {
    MainApi.register(email, password, name)
      .then((data) => {
        if (data) {
          handleLogin(email, password);
          history.push("/signin");
        }
      })
      .catch(() => {
        setRegisteredError(true);
      });
  }

  return (
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <Header bgColor="dark" textColor="white" isLogin={isLogin} />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies" exact>
          <Header bgColor="light" textColor="black" isLogin={isLogin} />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies" exact>
          <Header bgColor="light" textColor="black" isLogin={isLogin} />
          <Movies />
          <Footer />
        </Route>
        <Route path="/profile" exact>
          <Header bgColor="light" textColor="black" isLogin={isLogin} />
          <Profile />
        </Route>
        <Route path="/signin" exact>
          <Login handleLogin={handleLogin} loginError={loginError} />
        </Route>
        <Route path="/signup" exact>
          <Register
            handleRegister={handleRegister}
            registrationError={registrationError}
          />
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
