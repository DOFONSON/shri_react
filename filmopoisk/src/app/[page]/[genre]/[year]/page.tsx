import React from 'react';
import Filter from '@/components/Filter/Filter';
import Films from './Films';
import style from './style.module.css'
import Search from '@/components/Search/Search';
const FilmsPage = async ({params}) => {

  return (
    <main>
      <Filter />
      <div className={style.main__main}>
      <Search />

      <Films params={params} />
      </div>
    </main>
  );
};

export default FilmsPage;
