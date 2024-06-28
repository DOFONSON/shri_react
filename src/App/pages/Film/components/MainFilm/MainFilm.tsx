import { Movie } from "../../../../../types/Movie"
import Rate from "./components/Rate/Rate"
import styles from './style.module.css'
import cn from 'clsx'

type MainFilmProps = {
    movie: Movie,
    id: string | undefined,
    userRating: number | null
}

const MainFilm: React.FC<MainFilmProps> = ({ movie, id, userRating }) => {
    return (
        <div className={styles.main_movie}>
            <img src={movie.poster} alt={movie.title} className={styles.main_movie__poster} />
            <div>
                <div className={styles.main_movie__header}>
                    <h1 className={styles.main_movie__title}>{movie.title}</h1>
                    <Rate id={id} userRating={userRating} publRate={movie.rating}/>
                </div>

                <ul className={styles.main_movie_list}>
                    <li className={styles.main_movie_list__item}> <span className={styles.item__option}>Жанр:</span> {movie.genre}</li>
                    <li className={styles.main_movie_list__item}><span className={styles.item__option}>Год выпуска:</span> {movie.release_year}</li>
                    <li className={styles.main_movie_list__item}><span className={styles.item__option}>Рейтинг:</span> {movie.rating}</li>
                    <li className={styles.main_movie_list__item}>
                        <span className={cn(styles.item__option, styles.main_movie_list__item_last)}>Описание</span>
                        {movie.description}</li>
                </ul>
            </div>
        </div>
    )
}

export default MainFilm
