import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import MainApi from "../../utils/MainApi";
import Register from "../Register/Register";
import CurrentUserContext from "../../context/CurrentUserContext";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [registrationError, setRegisteredError] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [isEditError, setIsEditError] = React.useState(false);
  const [isEditDone, setIsEditDone] = React.useState(false);

  function isLoggedInCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.getInfo()
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo);
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

  function editProfile(name, email) {
    MainApi.setInfo(name, email)
      .then((info) => {
        setCurrentUser(info);
        setIsEditDone(true);
        setIsEditError(false);
        setTimeout(() => {
          setIsEditDone(false);
        }, 4000);
      })
      .catch(() => {
        setIsEditError(true);
      });
  }

  function handleLogout() {
    history.push("/");
    setIsLogin(false);
    localStorage.clear();
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
              editProfile={editProfile}
              isLogin={isLogin}
              currentUser={currentUser}
              isEditError={isEditError}
              isEditDone={isEditDone}
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
