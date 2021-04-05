import React from "react";
import photo from "../../images/student_pic.jpg";
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
              <h3 className="about-me__name">Алексей</h3>
              <p className="about-me__profession">Фронтенд-разработчик</p>
              <p className="about-me__text">
                Я занимаюсь изучением этой обширной и быстро развивающейся
                отрасли сравнительно недавно и, каждый день для меня начинается
                с открытия чего-то нового. Таким образом, я повышаю свои
                профессиональные навыки и качество выполненных мною проектов. За
                время учебы, мною успешно выполнено несколько проектов по
                разработке веб приложений. Ниже предоставленные ссылки на
                значимые для меня работы.
              </p>
            </div>
            <nav className="about-me__links">
              <a
                className="about-me__link"
                href="https://www.linkedin.com/in/alexey-shumilin-340088ba/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="about-me__link"
                href="https://github.com/AlexeyShumilin"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </nav>
          </div>
          <img className="about-me__photo" src={photo} alt="Фото" />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
