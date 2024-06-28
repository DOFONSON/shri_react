import { useEffect, useState } from 'react';
import { useFetchMoviesQuery } from '../../../../../store/reducers/moviesApi';
import Film from './components/Film/Film';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '../../../../../types/Movie';
import Pagination from './components/Pagination/Pagination';
import style from './style.module.css'
import LoadingStub from './components/Stubs/LoadingStub/LoadingStub';
import ErrorStub from './components/Stubs/ErrorStub/ErrorStub';

const Films = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let pNumber = searchParams.get('page') || '1';
  const { data: movies = [], error, isFetching } = useFetchMoviesQuery(pNumber);
  
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  let searchFieldVal = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    if (!isFetching && movies.length > 0) {
      let filteredMoviesTemp = movies;

      if (searchFieldVal) {
        filteredMoviesTemp = filteredMoviesTemp.filter((movie: Movie) =>
          movie.title.toLowerCase().includes(searchFieldVal)
        );
      }

      if (searchParams.get('genre') && searchParams.get('genre') !== 'не выбран') {
        filteredMoviesTemp = filteredMoviesTemp.filter((movie: Movie) =>
          movie.genre === searchParams.get('genre')
        );
      }

      if (searchParams.get('year') && searchParams.get('year') !== 'не выбран') {
        filteredMoviesTemp = filteredMoviesTemp.filter((movie: Movie) => {
          const yearParam = searchParams.get('year');
          if (yearParam?.includes('-')) {
            const [startYear, endYear] = yearParam.split('-').map(Number);
            return movie.release_year >= startYear && movie.release_year <= endYear;
          }
          return movie.release_year === Number(yearParam);
        });
      }

      setFilteredMovies(filteredMoviesTemp);
    }
  }, [movies, searchFieldVal, searchParams, isFetching]);

  const [currentPage, setCurrentPage] = useState(Number(pNumber));
  const moviesPerPage = 10;

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set('page', (Number(pNumber) + 1).toString());
      return newParams;
    });
  };

  const prevPage = () => {
    setCurrentPage(prev => prev - 1);
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set('page', (Number(pNumber) - 1).toString());
      return newParams;
    });
  };

  if (isFetching) return <LoadingStub />;
  if (error || !filteredMovies.length) return <ErrorStub />;

  return (
    <div>
      <ul className={style.main_movies__list}>
        {filteredMovies.map((movie: Movie) => (
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
        totalMovies={filteredMovies.length}
        moviesPerPage={moviesPerPage}
      />
    </div>
  );
};

export default Films;
