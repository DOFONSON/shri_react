import React from "react";
import { Link } from "react-router-dom";
import styles from './style.module.css'
import cl from 'clsx'
import Star from "../../../../../../../components/Star/Star";
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

    const starArr = new Array(5).fill(0)
    const stars = Math.round(Number(rating))
    for (let i = 0; i < stars; i++) {
        starArr[i] = 1
    }
    return (
        <Link to={`/film/${id}`} className={styles.main__film_link}>
        <div className={styles.main__film} key={id}>
            <div className={styles.main_film__photo}>
                <img src={poster} alt={`${title} poster`} />
            </div>
            <div className={styles.main_film__main}>
                <h3 className={styles.main_film__title}>{title}</h3>
                <ul className={styles.main_film__option_list}>
                    <ul className={cl(styles.main_film__option_list_item, styles.main_film__option_list_item_first)}>
                        <li className={styles.main_film__option}>Жанр</li>
                        <li className={styles.main_film__option}>Год выпуска</li>
                        <li className={styles.main_film__option}>Описание</li>
                    </ul>
                    <ul className={cl(styles.main_film__option_list_item, styles.main_film__option_list_item_second)}>
                        <li>{genre}</li>
                        <li>{release_year}</li>
                        <li>{description}</li>
                    </ul>
                </ul>
            </div>
            <div className={styles.rating}>
                {starArr.map((isStar, i) => {
                    return (
                    <div className={styles.rating__rate}>
                        <Star isActive={isStar} className={styles.rate_star}/>
                        <span className={cl(styles.rate__number, isStar ? styles.rate__number_active : styles.rate__number_disabled)}>{i + 1}</span>
                    </div>
                    )
                })}
            </div>
        </div>
        </Link>
    );
}

export default Film;
