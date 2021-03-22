import React from "react";
import photo from "../../images/student-photo.jpg";
import Portfolio from "../Portfolio/Portfolio";

import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__wrap">
          <div className="about-me__description">
            <div className="about-me__description">
              <h3 className="about-me__name">Максим</h3>
              <p className="about-me__profession">
                Фронтенд-разработчик, 23 года
              </p>
              <p className="about-me__text">
                Я живу в городе Москва, с 2018 года по 2020 работал в должности
                QA Engineer. Работал как в продуктовых, так и в аутсорс
                командах. После этого решил развиваться в направлении Фронтенд
                разработки. Интересуюсь программированием, решением задач и
                изучением новых технологий.
              </p>
            </div>
            <div className="about-me__links">
              <a
                className="about-me__link"
                href="https://www.linkedin.com/in/maksim-pozharskiy-72915a155/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="about-me__link"
                href="https://github.com/MaksimPozharskiy"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <img className="about-me__photo" src={photo} alt="Фото студента" />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
