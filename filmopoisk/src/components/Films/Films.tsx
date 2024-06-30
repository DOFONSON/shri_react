import Film from '../Films/components/Film/Film'; 
import { Movie } from '../../../types/Movie'; 
import style from './style.module.css'; 
import { getMovies } from '@/app/main/movies/getMovies';
import Pagination from './components/Pagination/Pagination';
const Films = async () => {
  
  const movies = await getMovies('', '', '')
   console.log(movies.search_result);
   return (
    <div>
      <ul className={style.main_movies__list}>
        {movies.search_result.map((movie: Movie) => (
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
        currentPage={1}
        totalMovies={movies.length}
        moviesPerPage={10}
      />
    
    </div>
  );
   
};

export default Films;
