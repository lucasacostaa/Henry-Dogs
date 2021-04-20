import React from 'react';
import './styles/landing/Landing.scss'

const Landing = () => {
    return (
        <div className="landing-box">
            <div className="landingContainer">
                <div className="text-content">
                    <h1 id="landing-title">Discover the world's top dog breeds</h1>
                    <p>Henry Dogs is the leading destination to know more about the animal you love.</p>
                    <a className="search" href="/main">Start your search</a>
                </div>
                <div className="shot-content">
                    <picture>
                        <img alt=""/>
                    </picture>            
                </div>
            </div>
        </div>
    )
}

export default Landing
