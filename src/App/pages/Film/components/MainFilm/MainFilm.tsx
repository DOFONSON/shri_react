import { Movie } from "../../../../../types/Movie"

type MainFilmProps = {
    movie: Movie
}
const MainFilm: React.FC<MainFilmProps> = ({ movie }) => {
    return (
        <div className="main_movie">
            <img src={movie.poster} alt={movie.title} className="main_movie__poster" />
            <div>
                <h1 className="main_movie__title">{movie.title}</h1>
                <ul className="main_movie_list">
                    <li className="main_movie_list__item">Genre: {movie.genre}</li>
                    <li className="main_movie_list__item">Release Year: {movie.release_year}</li>
                    <li className="main_movie_list__item">Rating: {movie.rating}</li>
                    <li className="main_movie_list__item">{movie.description}</li>
                </ul>
            </div>
        </div>
    )
}

export default MainFilm