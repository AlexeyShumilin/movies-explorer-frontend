import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about">
      <div className="about__container">
        <h2 className="about__title" id="about">
          О проекте
        </h2>
        <div className="about__wrapper">
          <div className="about__text-wrap">
            <h3 className="about__text-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about__text-subtitle">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__text-wrap">
            <h3 className="about__text-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about__text-subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about__duration-container">
          <div className="about__duration-wrap about__duration-wrap_back-end">
            <div className="about__duration about__duration_back-end">
              1 неделя
            </div>
            <p className="about__duration-name">Back-end</p>
          </div>
          <div className="about__duration-wrap about__duration-wrap_front-end">
            <div className="about__duration about__duration_front-end">
              4 недели
            </div>
            <p className="about__duration-name">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
