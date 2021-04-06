import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import logo from "../../images/header-logo.svg";

function Header({ bgColor, textColor }) {
  const jwt = localStorage.getItem("jwt");
  const { pathname } = useLocation();
  const text = `${pathname === "/" && !jwt ? "Регистрация" : "Аккаунт"}`;

  const [activeBurger, setActiveBurger] = React.useState(false);

  function handleActiveBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <header className={`header header_bg-color_${bgColor}`}>
      <div className="header__container">
        <div className="header__wrapper">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Логотип" />
          </Link>
          {pathname === "/" && !jwt ? "" : <Navigation />}
        </div>
        <div
          className={`header__wrapper ${
            pathname === "/" && !jwt ? "" : "header__wrapper_burger"
          }`}
        >
          <Link
            className={`header__sign-text header__sign-text_color_${textColor} `}
            to={`${pathname === "/" && !jwt ? "/signup" : "/profile"}`}
          >
            {text}
          </Link>
          {pathname === "/" && !jwt ? (
            <Link to="/signin" className="header__btn-signin" type="button">
              Войти
            </Link>
          ) : (
            <button className="header__btn-account" type="button" />
          )}
        </div>
        {pathname === "/" && !jwt ? (
          ""
        ) : (
          <>
            <div
              className={`header__burger ${
                activeBurger ? "header__burger_active" : ""
              }`}
              onClick={handleActiveBurger}
            >
              <div className="header__burger-line" />
              <div className="header__burger-line" />
              <div className="header__burger-line" />
            </div>
            <div
              className={`header__burger-menu-wrap ${
                activeBurger ? "header__burger-menu-wrap_active" : ""
              }`}
              onClick={handleActiveBurger}
            >
              <nav className="header__burger-nav">
                <ul className="header__burger-list">
                  <li className="header__burger-item">
                    <Link className="header__burger-link" to="/">
                      Главная
                    </Link>
                  </li>
                  <li className="header__burger-item">
                    <Link className="header__burger-link" to="/movies">
                      Фильмы
                    </Link>
                  </li>
                  <li className="header__burger-item">
                    <Link className="header__burger-link" to="/saved-movies">
                      Сохранённые фильмы
                    </Link>
                  </li>
                </ul>
              </nav>
              <div
                className={`header__wrapper header__wrapper_burger-menu ${
                  pathname === "/" && !jwt ? "header__wrapper_burger" : ""
                }`}
              >
                <Link
                  className={`header__sign-text header__sign-text_color_${textColor}`}
                  to={`${pathname === "/" && !jwt ? "/signup" : "/profile"}`}
                >
                  {text}
                </Link>
                {pathname === "/" && !jwt ? (
                  <Link
                    to="/signin"
                    className="header__btn-signin"
                    type="button"
                  >
                    Войти
                  </Link>
                ) : (
                  <button className="header__btn-account" type="button" />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
