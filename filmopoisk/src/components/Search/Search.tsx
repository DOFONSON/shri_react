"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Input from '@/components/Input/Input';
import useDebounce from '../../../hooks/useDebounce';
import SearchIcon from './SearchIcon';

const Search = () => {
  const [inpValue, setInpValue] = useState('');
  const plHl = 'Название фильма';
  const debouncedSearchTerm = useDebounce(inpValue, 500);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams as any);
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm.toLocaleLowerCase());
    } else {
      params.delete('search');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm]);

  const handleInputChange = (value: string) => {
    setInpValue(value);
  };

  return (
    <Input
      id="searchInput"
      onChange={handleInputChange}
      className={'search__input_input'}
      value={inpValue}
      holder={plHl}
      afterSlot={<SearchIcon />}
    />
  );
};

export default Search;
