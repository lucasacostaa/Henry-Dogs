import React from 'react'
import Suggestion from './suggestion/Suggestion';
import './SearchSuggestions.scss'

const SearchSuggestions = ({suggestions, state}) => {
    return (
        <>
        <ul className="swrapper">
            {suggestions.length >= 1 && suggestions.map(name => <Suggestion name={name}/>)}
        </ul>
        </>
    )
}

export default SearchSuggestions
