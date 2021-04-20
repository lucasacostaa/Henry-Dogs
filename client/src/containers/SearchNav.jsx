import React from 'react'
import FilterMenu from '../components/search&Filters/filterMenu/FilterMenu'
import SortButton from '../components/search&Filters/sortButton/SortButton'
import './styles/SearchNav.scss'

const SearchNav = () => {
    return (
        <div className="search-nav-container">
            <SortButton/>
            <FilterMenu/>
        </div>
    )
}

export default SearchNav
