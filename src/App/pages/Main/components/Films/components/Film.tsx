import React from "react";
import { Link } from "react-router-dom";

type FilmProps = {
    id: string,
    description: string,
    genre: string,
    rating: string,
    release_year: number,
    title: string,
    poster: string
}

const Film: React.FC<FilmProps> = ({
    id,
    description,
    genre,
    rating,
    release_year,
    title,
    poster
}) => {
    return (
        <Link to={`/film/${id}`}>
        <div className="main__film" key={id}>
            <div className="main-film__photo">
                <img src={poster} alt={`${title} poster`} />
            </div>
            <div className="main-film__main">
                <h3 className="main-film__title">{title}</h3>
                <ul className="main-film__option_list">
                    <ul className="main-film__option_list_item main-film__option_list_item--first">
                        <li>Жанр</li>
                        <li>Год выпуска</li>
                        <li>Описание</li>
                    </ul>
                    <ul className="main-film__option_list_item main-film__option_list_item--second">
                        <li>{genre}</li>
                        <li>{release_year}</li>
                        <li>{description}</li>
                    </ul>
                </ul>
            </div>
            <div className="rating">
                <p>Rating: {rating}</p>
            </div>
        </div>
        </Link>
    );
}

export default Film;
