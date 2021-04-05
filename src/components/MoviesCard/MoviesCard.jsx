import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import testCard from "../../images/test_card.jpg";
import moviesIconCard from "../../images/saved_card.svg";
import moviesSavedCardIcon from "../../images/delete_card.svg";
import saveCardIcon from "../../images/save_card.svg";

function MoviesCard() {
  const { pathname } = useLocation();
  const isAdded = true;
  const moviesIcon = isAdded ? moviesIconCard : saveCardIcon;
  const cardIcon = pathname === "/movies" ? moviesIcon : moviesSavedCardIcon;

  return (
    <li className="card">
      <div className="card__wrap">
        <img className="card__image" src={testCard} alt="Тестовая карточка" />
        <img className="card__icon" src={cardIcon} alt="Тестовая иконка" />
      </div>
      <div className="card__description">
        <p className="card__name">Баския: Взрыв реальности</p>
        <p className="card__duration">1ч 17м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
