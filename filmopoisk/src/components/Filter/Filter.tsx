"use client"
import React, { useEffect } from "react";
import MultiDropdown from "./components/Multidrop/Multidrop";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styles from './style.module.css';

const Filter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    console.log(pathname);
    
    const genreParam = pathname.split('/')[2] || '0';
    const yearParam = pathname.split('/')[3] || '0';
    const [genreValue, setGenreValue] = React.useState<Option | undefined>(undefined);
    const [yearValue, setYearValue] = React.useState<Option | undefined>(undefined);

    type Option = {
        key: string;
        value: string;
    };

    const GENRES = {
        '0': 'Не выбран',
        comedy: 'Комедия',
        drama: 'Драма',
        action: 'Боевик',
        thriller: 'Триллер',
        horror: 'Ужасы',
        family: 'Семейный',
        cartoon: 'Анимированный',
        fantasy: 'Фэнтези',
        romance: 'Романтика',
        adventure: 'Приключения',
        musical: 'Мьюзикл',
        war: 'Военный',
    };

    const YEARS = {
        '0': 'Не выбран',
        '2009': '2009',
        '2008': '2008',
        '2007': '2007',
        '2006': '2006',
        '1990-2005': '1990-2005',
        '1950-1989': '1950-1989',
    };

    let genresData = Object.entries(GENRES).map(([key, value]) => ({ key, value }));
    let yearsData = Object.entries(YEARS).map(([key, value]) => ({ key, value }));

    useEffect(() => {
        setGenreValue(genresData.find(g => g.key === genreParam));
        setYearValue(yearsData.find(y => y.key === yearParam));
    }, [genreParam, yearParam]);

    const updatePathname = (genre: string, year: string) => {
        let newPathname = `/1/${encodeURIComponent(genre)}/${encodeURIComponent(year)}`;
        router.push(newPathname);
    };

    const getGenreFunction = (value: Option | undefined): void => {
        setGenreValue(value);
        updatePathname(value?.key.toLocaleLowerCase() || '0', yearValue?.key.toLocaleLowerCase() || '0');
    };

    const getYearFunction = (value: Option | undefined): void => {
        setYearValue(value);
        updatePathname(genreValue?.key.toLocaleLowerCase() || '0', value?.key.toLocaleLowerCase() || '0');
    };

    return (
        <div className={styles.main__filter}>
            <h3 className={styles.filter__title}>Фильтр</h3>
            <div className={styles.filter__input}>
                <label htmlFor="searchInput">
                    <span className={styles.filter__label_title}>Жанр</span>
                    <MultiDropdown
                        className={styles.filter__drop}
                        options={genresData}
                        value={genreValue}
                        onChange={getGenreFunction}
                        getTitle={(value) => value ? value.value : 'Выберите жанр'}
                        singleSelect
                    />
                </label>
            </div>
            <div className={styles.filter__input}>
                <label htmlFor="searchInput">
                    <span className={styles.filter__label_title}>Год</span>
                    <MultiDropdown
                        className={styles.filter__drop}
                        options={yearsData}
                        value={yearValue}
                        onChange={getYearFunction}
                        getTitle={(value) => value ? value.value : 'Выберите год'}
                        singleSelect
                    />
                </label>
            </div>
        </div>
    );
};

export default Filter;
