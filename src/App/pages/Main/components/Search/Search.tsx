import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import useDebounce from '../../../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const [inpValue, setInpValue] = useState('');
    const plHl = 'Название фильма';
    const debouncedSearchTerm = useDebounce(inpValue, 500);
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        setSearchParams((params) => {
            const newParams = new URLSearchParams(params);
            newParams.set('search', debouncedSearchTerm.toLocaleLowerCase() || '');
            return newParams;
        });
    }, [debouncedSearchTerm]);

    return (
        <Input
            id="searchInput"
            onChange={setInpValue}
            className={'search__input_input'}
            value={inpValue}
            holder={plHl}
        />
    );
};

export default Search;
