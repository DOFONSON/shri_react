import { useEffect, useState } from 'react';
import { useFetchMoviesQuery } from '../../../../../store/reducers/moviesApi';
import Film from './components/Film/Film';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '../../../../../types/Movie';
import Pagination from './components/Pagination/Pagination';
import style from './style.module.css';
import LoadingStub from './components/Stubs/LoadingStub/LoadingStub';
import ErrorStub from './components/Stubs/ErrorStub/ErrorStub';

const Films = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get('genre') || '';
  const year = searchParams.get('year') || '';
  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';

  const { data: movies = [], error, isFetching } = useFetchMoviesQuery({ page, genre, year, search });

  const [currentPage, setCurrentPage] = useState(Number(page));
  const moviesPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set('page', '1');
      return newParams;
    });
  }, [genre, year, search]);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set('page', (Number(page) + 1).toString());
      return newParams;
    });
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set('page', (Number(page) - 1).toString());
      return newParams;
    });
  };

  if (isFetching) return <LoadingStub />;
  if (error || movies.length < 1) return <ErrorStub />;

  return (
    <div>
      <ul className={style.main_movies__list}>
        {movies.map((movie: Movie) => (
          <li key={movie.id}>
            <Film
              id={movie.id}
              title={movie.title}
              description={movie.description}
              genre={movie.genre}
              rating={movie.rating}
              release_year={movie.release_year}
              poster={movie.poster}
            />
          </li>
        ))}
      </ul>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        totalMovies={movies.length}
        moviesPerPage={moviesPerPage}
      />
    </div>
  );
};

export default Films;
