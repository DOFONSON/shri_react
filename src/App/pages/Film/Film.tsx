import { useState } from 'react';
import style from './style.module.css'
import { useParams } from 'react-router-dom';
import { useFetchSingleMovieQuery, useRateMovieMutation } from '../../../store/reducers/singleMovieApi';
import { useSelector } from 'react-redux';
import ActorsList from './components/ActorsList/ActorsList';
import MainFilm from './components/MainFilm/MainFilm';

const Film = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movie, error, isLoading } = useFetchSingleMovieQuery(id);
    const [rateMovie] = useRateMovieMutation();
    const token = useSelector((state: any) => state.auth.token);
    const [rating, setRating] = useState(0);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error while fetching data</div>;
    if (!movie) return <div>No movie data</div>;

    const handleRating = async () => {
        try {
            await rateMovie({ id, rating }).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={style.main__film}>
            <MainFilm movie={movie} />
            <ActorsList movie={movie} />
            {token && (
                <div>
                    <h3>Rate this movie</h3>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        min="1"
                        max="10"
                    />
                    <button onClick={handleRating}>Submit Rating</button>
                </div>
            )}
        </div>
    );
};

export default Film;
