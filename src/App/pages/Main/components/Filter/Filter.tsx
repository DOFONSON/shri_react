import React from "react";
import MultiDropdown from "./components/Multidrop/Multidrop"
const Filter = () => {

    const [genreValue, setGenreValue] = React.useState<Option[]>([]);
    const [yearValue, setYearValue] = React.useState<Option[]>([]);
  

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
    }
    const YEARS = {
        '0': 'Не выбран',
        '2009': '2009',
        '2008': '2008',
        '2007': '2007',
        '2006': '2006',
        '1990-2005': '1990-2005',
        '1950-1989': '1950-1989',
    }
    let genresData = []
    let yearsData = []

    for (const key in GENRES) {

        let obj = {
            key: `${key}`,
            value: `${GENRES[key]}`
        }
        genresData.push(obj)
    }

    for (const key in YEARS) {
        
        let obj = {
            key: `${key}`,
            value: `${YEARS[key]}`
        }
        yearsData.push(obj)
    }
    const getGenreFunction = (values: Option[]): string => {
        if (values.length === 0) {
            return 'Выберите жанр'
        } else {
            let str = ''
            let flag = false
            if (values.length > 1) {
                flag = true
            }
            for (let i = 0; i < values.length; i++) {
                console.log(values[i]);
                
                if (i == values.length - 1) {
                    str += values[i].value
                } else {
                    str += `${values[i].value}, `
                    console.log(str);
                    
                }
            }
            console.log(str);
            
            return str
        }

    }
    const getYearFunction = (values: Option[]): string => {
        if (values.length === 0) {
            return 'Выберите год'
        } else {
            let str = ''
            let flag = false
            if (values.length > 1) {
                flag = true
            }
            for (let i = 0; i < values.length; i++) {
                if (i == values.length - 1) {
                    str += values[i].value
                } else {
                    str += `${values[i].value}, `
                }
            }
            return str
        }

    }
    return (
        <div className="main__filter">
          <h3>Фильтр</h3>
          <div className="filter__input">
            <label htmlFor="searchInput">
              <p>Жанр</p>
              <MultiDropdown
                className="filter__drop"
                options={genresData}
                value={genreValue}
                onChange={setGenreValue}
                getTitle={getGenreFunction}
              />
            </label>
          </div>
          <div className="filter__input">
            <label htmlFor="searchInput">
              <p>Кинотетр</p>
              <MultiDropdown
                className="filter__drop"
                options={yearsData}
                value={yearValue}
                onChange={setYearValue}
                getTitle={getYearFunction}
              />
            </label>
          </div>
        </div>
      );
}

export default Filter