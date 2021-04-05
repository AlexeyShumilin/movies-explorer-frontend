import React from "react";
import "./MoviesCard.css";
import {useLocation} from "react-router-dom";
import moviesIconCard from "../../images/added-card-icon.svg";
import moviesSavedCardIcon from "../../images/delete-card-icon.svg";
import saveCardIcon from "../../images/save-card-icon.svg"
import CurrentUserContext from '../../context/CurrentUserContext';

function MoviesCard({
                        movie,
                        cardName,
                        cardDuration,
                        imageLink,
                        trailerLink,
                        addMovie,
                        removeMovie,
                        savedMovies
                    }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [isAddedCard, setIsAddedCard] = React.useState(false);

    const {pathname} = useLocation();
    // If the movie is added to favorites
    const moviesIcon = (isAddedCard ? moviesIconCard : saveCardIcon)
    // If on the general search page, then show the icon defined on the line above, if not, then the delete icon
    const cardIcon = (pathname === "/movies" ? moviesIcon : moviesSavedCardIcon)


    function hadleLikeMovie() {
        if (!isAddedCard) {
            addMovie(movie)
            setIsAddedCard(true)
        } else {
            const movieItem = savedMovies.filter((savedMovie) => savedMovie.movieId === movie._id);
            removeMovie(movieItem[0].data._id)
            console.log(movieItem[0].data)
            setIsAddedCard(false)
        }
    }

    function hadleDeleteButton() {
        removeMovie(movie._id);
    }

    React.useEffect(() => {
        if (savedMovies.length > 0) {
            if (!isAddedCard) {
                setIsAddedCard(savedMovies.some(savedMovie =>
                    savedMovie.movieId === movie._id && savedMovie.owner === currentUser._id));
            } else {
                setIsAddedCard(false)
            }
        }
    }, []);
    const functionIcon = (pathname === "/movies" ? hadleLikeMovie : hadleDeleteButton)

    return (
        <li className="card">

            <div className="card__wrap">
                <img className="card__icon" src={cardIcon} alt="icon" onClick={functionIcon}/>
                <a
                    className="card__trailer-link"
                    href={trailerLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img className="card__image" src={imageLink} alt={cardName}/>
                </a>
            </div>
            <div className="card__description">
                <p className="card__name">{cardName}</p>
                <p className="card__duration">{cardDuration}</p>
            </div>

        </li>
    );
}

export default MoviesCard;
