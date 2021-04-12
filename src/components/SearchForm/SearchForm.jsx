import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  onSubmit,
  searchValue,
  setSearchValue,
  inputError,
  setInputError,
  isShortFilms,
  setIsShortFilms,
}) {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={onSubmit}>
          <div className="search__wrap">
            <input
              placeholder="Фильм"
              className="search__input"
              value={searchValue}
              onChange={(evt) => {
                setSearchValue(evt.target.value);
              }}
              onClick={() => setInputError("")}
            />
            <button type="submit" className="search__submit">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.11127 9.59655C7.39296 11.3149 4.60704 11.3149 2.88873 9.59655C1.17042 7.87824 1.17042 5.09232 2.88873 3.37401C4.60704 1.6557 7.39296 1.6557 9.11127 3.37401C10.8296 5.09232 10.8296 7.87824 9.11127 9.59655ZM9.63973 11.2561C7.28746 13.0554 3.90875 12.8793 1.75736 10.7279C-0.585786 8.38478 -0.585786 4.58579 1.75736 2.24264C4.10051 -0.100505 7.89949 -0.100505 10.2426 2.24264C12.3939 4.39394 12.5701 7.77244 10.7711 10.1247L15.0511 14.4047L13.9197 15.5361L9.63973 11.2561Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <span className="search__input-error">{inputError}</span>
          <FilterCheckbox
            filterText="Короткометражки"
            isShortFilms={isShortFilms}
            setIsShortFilms={setIsShortFilms}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
