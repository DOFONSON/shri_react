import { useEffect, useState } from 'react';
import { useFetchMoviesQuery } from '../../../../../store/reducers/moviesApi';
import Film from './components/Film';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '../../../../../types/Movie';

const Films = () => {
  let { data: movies = [], error, isLoading, refetch } = useFetchMoviesQuery();
  console.log(refetch);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredMovies, setFilteredMovies] = useState(movies);
  let searchFieldVal = searchParams.get('search')

  useEffect(() => {
    refetch()
    console.log(movies);
    
    let filteredMoviesTemp = movies;
    movies = filteredMoviesTemp.filter((movie: Movie) => {
        return movie.title.toLocaleLowerCase().includes(String(searchFieldVal))
    })
    console.log(movies);
    
  }, [searchFieldVal, refetch])

  console.log(searchFieldVal);
  
  useEffect(() => {
    let filteredMoviesTemp = movies;
    if (!(searchParams.get('genre') === 'не выбран' ||!searchParams.get('genre'))) {
      filteredMoviesTemp = filteredMoviesTemp.filter((movie: Movie) => {
        return movie.genre == searchParams.get('genre');
      });
    }
    if (!(searchParams.get('year') === 'не выбран' ||!searchParams.get('year'))) {
      filteredMoviesTemp = filteredMoviesTemp.filter((movie: Movie) => {
        if (searchParams.get('year')?.includes('-')) {
          let temp = searchParams.get('year')?.split('-');
          return movie.release_year <= Number(temp[1]) && movie.release_year >= Number(temp[0]);
        }
        return movie.release_year == Number(searchParams.get('year'));
      });
    }
    setFilteredMovies(filteredMoviesTemp);
  }, [searchParams, isLoading]);

  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = 4;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfFirstMovie + moviesPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredMovies.length / moviesPerPage)));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul className='main-movies__list'>
        {currentMovies.map((movie: Movie) => (
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
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredMovies.length / moviesPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default Films;