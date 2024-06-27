
import { SingleMovie } from "../../../../../types/SingleMovie"

type ActorsList = {
    movie: SingleMovie
}

const ActorsList: React.FC<ActorsList> = ({ movie }) => {
    return (
        <div className="movie__actors">
            <h3>Актёры</h3>
            <ul className="movie__actors_list">
                {movie.actors.map((actor, index) => (
                    <li key={index} className="movie__actors_list_item">
                        <img src={actor.photo} alt={actor.name} className="actors_list_item__img"/>
                        <p className="actors_list_item__name">{actor.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ActorsList