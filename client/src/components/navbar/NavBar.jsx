import React from 'react';
import './NavBar.scss';
import githubLogo from './githubLogo.png'
import linkedIn from './linkedin.png'
import {Link, Route} from 'react-router-dom'
import Favourites from '../../containers/Favourites';
import {DogCreation} from '../../containers/DogCreation';
import Detail from '../../containers/Detail';

const Header = () => {

    return (
        <>
            <nav>
            <div className="logo">
                Henry Dogs
            </div>
            
            <ul className="tabs">
                <li className="nav-button">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-button">
                    <Link to="/main/favourites">Favourites</Link>
                </li>
                <li className="nav-button">
                    <Link to="/main/create">Create your dog</Link>
                </li>
            </ul>

            <ul className="nav-sites">
                <li className="tab-site">
                    <img className="Gh"src={githubLogo} alt="Github Logo" href="/"/>
                </li>
                <li className="tab-site">
                    <img src={linkedIn} alt="LinkedIn Logo" href="/"/>
                </li>
            </ul>
        </nav>

        <Route path={"/main/favourites"}>
            <Favourites />
        </Route>
        <Route path={"/main/create"}>
            <DogCreation />
        </Route>
        <Route path={"/main/detail/:dogName"}>
            <Detail/>
        </Route>

        </>
        
    )
}

export default Header
