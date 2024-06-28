import styles from './style.module.css'
import { SingleMovie } from "../../../../../types/SingleMovie"

type ActorsList = {
    movie: SingleMovie
}

const ActorsList: React.FC<ActorsList> = ({ movie }) => {
    return (
        <div className={styles.movie__actors}>
            <h3 className={styles.movie__actors_title}>Актёры</h3>
            <ul className={styles.movie__actors_list}>
                {movie.actors.map((actor, index) => (
                    <li key={index} className={styles.movie__actors_list_item}>
                        <img src={actor.photo} alt={actor.name} className={styles.actors_list_item__img}/>
                        <p className={styles.actors_list_item__name}>{actor.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ActorsList