import React from "react";
import Select from 'react-select'

export const SearchBar = ({data, selectedCountry, selectCountry}) => {

    return (
        <div className="search-bar">
            <Select 
                options={data} 
                className="react-select"
                placeholder={selectedCountry.Country}
                getOptionLabel = {option => `${option.Country}`}
                getOptionValue = {option => `${option.Country}`}
                onChange = {selectCountry}
            />
        </div>
    )
}

export default SearchBar;