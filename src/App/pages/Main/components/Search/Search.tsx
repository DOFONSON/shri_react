import React from "react";
import Input from "../Input/Input";
const Search = () => {

    const [inpValue, setInpValue] = React.useState('');
    return (
        <Input id="searchInput" onChange={setInpValue} className={'search__input_input'} value={inpValue}/>
    )
}

export default Search