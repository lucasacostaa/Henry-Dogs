import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {removeDogFavourite} from '../redux/actions';
import './styles/favourites/Favourites.scss';
import DogCard from '../components/cardsGrid/card/DogCard';

const Favourites = ({removeDogFavourite, favs}) => {
    return (
        <div className="favourite-container">
            <div className="cards-slider">
                <Link to="/main" className="close-btn">X</Link>
                <span id="title">Favourites</span>
                <div className="cards">
                    {favs.length < 1 && <span id="no-favourites">
                        You don't have any favourite dog yet.<br/>
                        Try adding one
                        </span>}
                    {favs.length >= 1 && favs.map(dog => <DogCard name={dog.name} temperament={dog.temperament} image={dog.image} fav={true}/>)}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    favs: state.favourites
})

const mapDispatchToProps = {removeDogFavourite}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)
