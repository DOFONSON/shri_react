import React from "react";
import MultiDropdown from "./components/Multidrop/Multidrop";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
    const [genreValue, setGenreValue] = React.useState<Option | undefined>(undefined); 
    const [yearValue, setYearValue] = React.useState<Option | undefined>(undefined); 
    const [searchParams, setSearchParams] = useSearchParams();

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

    const getGenreFunction = (value: Option | undefined): void => { 
        setGenreValue(value);
        setSearchParams((params) => {
            const newParams = new URLSearchParams(params);
            newParams.set('genre', value?.value.toLocaleLowerCase() || ''); 
            return newParams;
        });
    };

    const getYearFunction = (value: Option | undefined): void => { 
        setYearValue(value);
        setSearchParams((params) => {
            const newParams = new URLSearchParams(params);
            newParams.set('year', value?.value.toLocaleLowerCase() || ''); 
            return newParams;
        });
    };

    return (
        <div className="main__filter">
            <h3 className="filter__title">Фильтр</h3>
            <div className="filter__input">
                <label htmlFor="searchInput">
                    <span className="filter__label_title">Жанр</span>
                    <MultiDropdown
                        className="filter__drop"
                        options={genresData}
                        value={genreValue}
                        onChange={getGenreFunction}
                        getTitle={(value) => value ? value.value : 'Выберите жанр'}
                        singleSelect 
                    />
                </label>
            </div>
            <div className="filter__input">
                <label htmlFor="searchInput">
                    <span className="filter__label_title">Кинотетр</span>
                    <MultiDropdown
                        className="filter__drop"
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
}

export default Filter;
