import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import logo from "../../images/logo_header.svg";

function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/"><img className="register__logo" src={logo} alt="Логотип" /></Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <Form
          submitText={{
              buttonText: "Зарегистрироваться",
              prompt: "Уже зарегистрированы?",
              route: "/signin",
              linkText: "Войти"
            }}
        >
          <label htmlFor="name" className="form__label">Имя</label>
          <input required id="name" className="form__input" minLength="2" type="text" />
          <span className='form__input-error'>Текст</span>
        </Form>
      </div>
    </section>
  );
}

export default Register;
