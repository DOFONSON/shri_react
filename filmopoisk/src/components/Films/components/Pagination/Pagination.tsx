"use client"

import React from 'react';
import PaginationArrow from './PaginationArrow';
import styles from './style.module.css';
import { useRouter, usePathname } from 'next/navigation';

type PaginationProps = {
  currentPage: number,
  totalMovies: number,
  moviesPerPage: number
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalMovies }) => {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.split('/')[1] || '1';
  const genreParam = pathname.split('/')[2] || '0';
  const yearParam = pathname.split('/')[3] || '0';

  const prevPage = function () {
    let newPathname = `/${+page - 1}/${encodeURIComponent(genreParam)}/${encodeURIComponent(yearParam)}`;
    router.push(newPathname);
  }
  
  const nextPage = function () {
    let newPathname = `/${+page + 1}/${encodeURIComponent(genreParam)}/${encodeURIComponent(yearParam)}`;
    router.push(newPathname);
  }

  return (
    <div className={styles.pagination}>
      <button onClick={prevPage} disabled={currentPage === 1} className={styles.pagination__btn}>
        <PaginationArrow orientation='left' disabled={currentPage === 1} />
      </button>
      <span className={styles.pagination__value}>{`${currentPage}`}</span>
      <button onClick={nextPage} disabled={currentPage === 5 || totalMovies < 10} className={styles.pagination__btn}>
        <PaginationArrow orientation='right' disabled={currentPage === 5 || totalMovies < 10} />
      </button>
    </div>
  );
};

export default Pagination;
