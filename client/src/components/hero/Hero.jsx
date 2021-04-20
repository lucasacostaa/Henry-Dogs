import React from 'react';
import './Hero.scss';
import SearchBar from '../searchBar/SearchBar.jsx';

const Hero = () => {
    return (
        <div className="container">
            <div className="text-content">
                <p>150+ dog breeds from all around the globe.</p>
                <div className="search-container">
                    <SearchBar/>
                </div>
            </div>
        </div>
    )
}

export default Hero
