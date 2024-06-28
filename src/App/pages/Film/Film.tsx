import style from './style.module.css'
import { useParams } from 'react-router-dom';
import { useFetchSingleMovieQuery } from '../../../store/reducers/singleMovieApi';
import ActorsList from './components/ActorsList/ActorsList';
import MainFilm from './components/MainFilm/MainFilm';

const Film = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movie, error, isLoading } = useFetchSingleMovieQuery(id);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error while fetching data</div>;
    if (!movie) return <div>No movie data</div>;

    return (
        <div className={style.main__film}>
            <MainFilm movie={movie} id={id} userRating={movie.userRating} />
            <ActorsList movie={movie} />
        </div>
    );
};

export default Film;
