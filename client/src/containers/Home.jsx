import React from 'react';
import Grid from '../components/cardsGrid/Grid.jsx';
import Hero from '../components/hero/Hero.jsx';
import Header from '../components/navbar/NavBar.jsx';
import SearchNav from './SearchNav.jsx';

const Home = () => {
    return (
        <>
            <Header/>
            <Hero/>
            <SearchNav/>
            <Grid/>

        </>
    )
}

export default Home
