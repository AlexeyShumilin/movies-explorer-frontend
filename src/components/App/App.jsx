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
import CurrentUserContext from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const history = useHistory();
  const [registrationError, setRegisteredError] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  function isLoggedInCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.getInfo()
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo.data);
            setIsLogin(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    isLoggedInCheck();
  }, []);

  React.useEffect(() => {
    if (isLogin) {
      MainApi.getInfo()
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleLogin(email, password) {
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
  }

  function handleLogout() {
    history.push("/");
    setIsLogin(false);
    localStorage.clear();
  }

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
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/" exact>
            <Header bgColor="dark" textColor="white" isLogin={isLogin} />
            <Main />
            <Footer />
          </Route>
          {isLogin && (
            <ProtectedRoute
              path="/movies"
              exact
              component={Movies}
              isLogin={isLogin}
              currentUser={currentUser}
            />
          )}
          {isLogin && (
            <ProtectedRoute
              path="/saved-movies"
              exact
              component={Movies}
              isLogin={isLogin}
              currentUser={currentUser}
            />
          )}
          {isLogin && (
            <ProtectedRoute
              path="/profile"
              exact
              component={Profile}
              handleLogout={handleLogout}
              isLogin={isLogin}
              currentUser={currentUser}
            />
          )}
          <Route path="/signin" exact>
            <Login handleLogin={handleLogin} loginError={loginError} />
          </Route>
          <Route path="/signup" exact>
            <Register
              handleRegister={handleRegister}
              registrationError={registrationError}
            />
          </Route>
          {isLogin && (
            <Route path="*">
              <NotFound />
            </Route>
          )}
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
