import React from 'react';
import style from './style.module.css'
import gitMovieById from '../../main/movie/getMovieById'
import MainFilm from '@/components/MainFilm/MainFilm';
import ActorsList from '@/components/ActorsList/ActorsList';
const FilmsPage = async ({params}) => {
    const movie = await gitMovieById(params.filmId)
    console.log(params);
    
  return (
    <main>
       <div className={style.main__film}>
            <MainFilm movie={movie} id={params.filmId} userRating={movie.userRating} />
            <ActorsList movie={movie} />
        </div>
    </main>
  );
};

export default FilmsPage;
