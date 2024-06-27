import { useEffect, useState } from 'react';
import { useFetchMoviesQuery } from '../../../../../store/reducers/moviesApi';
import Film from './components/Film/Film';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '../../../../../types/Movie';
import Pagination from './components/Pagination/Pagination';
import style from './style.module.css'
import LoadingStub from './components/Stubs/LoadingStub/LoadingStub';
import ErrorStub from './components/Stubs/ErrorStub/ErrorStub'
const Films = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let pNumber = searchParams.get('page') || '1'
  let { data: movies = [], error, isFetching, refetch } = useFetchMoviesQuery(pNumber);
  console.log(movies);
  
  const [filteredMovies, setFilteredMovies] = useState(movies);
  let searchFieldVal = searchParams.get('search')
  
  useEffect(() => {

    let filteredMoviesTemp = movies;
    movies = filteredMoviesTemp.filter((movie: Movie) => {
        return movie.title.toLocaleLowerCase().includes(String(searchFieldVal))
    })
    console.log(movies);
    
  }, [searchFieldVal])

    console.log(filteredMovies);
    
  
  useEffect(() => {
    refetch()
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
          if (temp != undefined) {
            return movie.release_year <= Number(temp[1]) && movie.release_year >= Number(temp[0]);
          }
        }
        return movie.release_year == Number(searchParams.get('year'));
      });
    }
    setFilteredMovies(filteredMoviesTemp);
  }, [searchParams, movies]);

  const [currentPage, setCurrentPage] = useState(Number(pNumber));

  const moviesPerPage = 10;

  
  
  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set('page', (Number(pNumber) + 1).toString() || ''); 
      return newParams;
  });
    
  };
  
  const prevPage = () => {
    setCurrentPage(prev => prev - 1);
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set('page', (Number(pNumber) - 1).toString() || ''); 
      return newParams;
  });
  };

  if (isFetching) return <LoadingStub />;
  if (error) return <ErrorStub />;

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
      <Pagination prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} totalMovies={filteredMovies.length} moviesPerPage={moviesPerPage}/>
    </div>
  );
};

export default Films;