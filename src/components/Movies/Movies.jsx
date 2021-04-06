/* eslint-disable no-unused-vars */
import React from "react";
import "./Movies.css";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import shortMoviesHandle from "../../helpers/shortMovies";

function Movies({ isLogin }) {
  const { pathname } = useLocation();
  const [movies, setMoviesList] = React.useState([]);
  const [renderedFilms, setRenderedFilms] = React.useState([]);
  const [countClickMoreFilms, setCountClickMoreFilms] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [inputError, setInputError] = React.useState("");
  const [visibilityMoviesList, setVisibilityMoviesList] = React.useState("");
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState("");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [visibilityBtnYet, setVisibilityBtnYet] = React.useState(
    "movies__button_hidden"
  );
  const [isShortFilms, setIsShortFilms] = React.useState(false);

  React.useEffect(() => {
    MainApi.getSavedMovies()
      .then((savedMoviesData) => {
        if (savedMoviesData) {
          setSavedMovies(savedMoviesData);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (pathname === "/saved-movies") {
      setVisibilityMoviesList("movies_visibility");
    }
  }, []);

  function filterMovies(films) {
    if (isShortFilms) {
      return shortMoviesHandle(films);
    }
    return films.filter((movie) => movie.duration >= 40);
  }

  function definitionSizeScreen() {
    return document.documentElement.clientWidth;
  }

  function coefficientScreen() {
    const width = definitionSizeScreen();
    if (width >= 1280) {
      return 3;
    }
    return 2;
  }

  const filteredMovies = React.useMemo(() => filterMovies(movies), [
    isShortFilms,
    movies,
  ]);
  const filteredRenderedMovies = React.useMemo(
    () => filterMovies(renderedFilms),
    [isShortFilms, renderedFilms]
  );
  const filteredSavedMovies = React.useMemo(() => filterMovies(savedMovies), [
    isShortFilms,
    savedMovies,
  ]);

  React.useEffect(() => {
    if (filteredMovies.length >= filteredRenderedMovies.length) {
      setVisibilityBtnYet("movies__button_hidden");
    }
  }, [filteredMovies, filteredRenderedMovies]);

  function countInitCards() {
    const width = definitionSizeScreen();
    if (width >= 1280) {
      return 12;
    }
    if (width >= 757) {
      return 8;
    }
    return 5;
  }

  function handleMoreRenderFilms() {
    const cards = countInitCards();

    setRenderedFilms(
      filteredMovies.slice(0, cards + countClickMoreFilms * coefficientScreen())
    );
    setCountClickMoreFilms(countClickMoreFilms + 1);
  }

  // Filter movies by keyword
  function filterMoviesFromLS(moviesList) {
    const films = moviesList.filter((movie) =>
      movie.nameRU.includes(searchValue)
    );

    setMoviesList(() => {
      localStorage.setItem("foundFilms", JSON.stringify(films));
      return films;
    });
  }

  //get films by keyword by clicking on Search
  function handleSearch(evt) {
    evt.preventDefault();
    if (searchValue === "") {
      setInputError("Нужно ввести ключевое слово");
      return;
    }
    // show preloader, hide movies
    setIsPreloaderOpen("preloader_active");
    setVisibilityMoviesList("");
    if (pathname === "/movies") {
      if (!localStorage.getItem("moviesList")) {
        MoviesApi.getMovies()
          .then((moviesList) => {
            localStorage.setItem("moviesList", JSON.stringify(moviesList));
            filterMoviesFromLS(JSON.parse(localStorage.moviesList));
            setIsPreloaderOpen("");
            setVisibilityMoviesList("movies_visibility");
            setVisibilityBtnYet("");
          })
          .catch((err) => console.log(err));
        return;
      }

      filterMoviesFromLS(
        localStorage.getItem("moviesList")
          ? JSON.parse(localStorage.moviesList)
          : []
      );
      setIsPreloaderOpen("");
      setVisibilityMoviesList("movies_visibility");
      setVisibilityBtnYet("");
    } else {
      setSavedMovies(
        savedMovies.filter((movie) => movie.nameRU.includes(searchValue))
      );
      setVisibilityMoviesList("movies_visibility");
      setIsPreloaderOpen("");
    }
  }

  function addMovie(movie) {
    MainApi.addMovie(movie)
      .then((dataMovie) => {
        setSavedMovies([dataMovie.data, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeMovie(movieId) {
    MainApi.removeMovie(movieId)
      .then(() => {
        const newMovies = savedMovies.filter((movie) => movie._id !== movieId);
        setSavedMovies(newMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header bgColor="light" textColor="black" isLogin={isLogin} />
      <SearchForm
        onSubmit={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        inputError={inputError}
        setInputError={setInputError}
        isShortFilms={isShortFilms}
        setIsShortFilms={setIsShortFilms}
      />
      <Preloader isPreloaderOpen={isPreloaderOpen} />
      <MoviesCardList
        movies={filteredMovies}
        visibilityMoviesList={visibilityMoviesList}
        renderedFilms={filteredRenderedMovies}
        setRenderedFilms={setRenderedFilms}
        handleMoreRenderFilms={handleMoreRenderFilms}
        countInitCards={countInitCards}
        addMovie={addMovie}
        removeMovie={removeMovie}
        savedMovies={filteredSavedMovies}
        setVisibilityMoviesList={setVisibilityMoviesList}
        visibilityBtnYet={visibilityBtnYet}
        setVisibilityBtnYet={setVisibilityBtnYet}
        shortMoviesHandle={shortMoviesHandle}
        isShortFilms={isShortFilms}
      />
      <Footer />
    </>
  );
}

export default Movies;
