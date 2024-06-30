import Film from '@/components/Films/components/Film/Film'; 
import { Movie } from '../../../../../types/Movie'; 
import style from './style.module.css'; 
import { getMovies } from '@/app/main/movies/getMovies';
import Pagination from '@/components/Films/components/Pagination/Pagination';
const Films = async ({params} : {
    params: {page:string, genre: string, year: string, str: string}
}) => {
   const movies = await getMovies(params.page, params.genre != '0' ? params.genre : '', params.year != '0' ? params.year : '')
   console.log(movies.length);
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
      <Pagination currentPage={+params.page}
        totalMovies={movies.search_result.length}
        moviesPerPage={10}/>
    </div>
  );
   
};

export default Films;
