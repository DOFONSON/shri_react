import React from 'react';
import PaginationArrow from './PaginationArrow';
import styles from './style.module.css';

type PaginationProps = {
  prevPage: () => void,
  nextPage: () => void,
  currentPage: number,
  totalMovies: number,
  moviesPerPage: number
};

const Pagination: React.FC<PaginationProps> = ({ prevPage, nextPage, currentPage, totalMovies }) => {
  console.log(totalMovies);
  
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
