import React, {useState} from 'react';
import {addDogFavourite, removeDogFavourite} from '../../../redux/actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './DogCard.scss';

const DogCard = ({id, name, temperaments, image, addDogFavourite, removeDogFavourite, fav = false}) => {
    const [favFlag, setFavFlag] = useState(fav)

    const handleAdd = () => {
        if(favFlag === true) return;
        addDogFavourite({name, temperaments, image})
        setFavFlag(true)
    }

    const handleDelete = () => {
        removeDogFavourite(name)
        setFavFlag(false)
    }
    return (
        <>
        <div key={name} className="dog-card">
            <div className="dog-photos" style={{backgroundImage:`url(${image})`}}>
                <Link to={`/main/detail/${id}`} className="dog-detail"/>
            </div>
            <div className="dog-info">
                <span>{name}</span>
                <span className="temperamentText">{temperaments && temperaments[0] !== undefined && temperaments[0].name}</span>
            </div>
            <button onClick={() => handleAdd()}>Fav</button>
            { favFlag === true && <button onClick={() => handleDelete()}>X Fav</button>}
        </div>
        </>
    )
}

const mapStateToProps = null;

const mapDispatchToProps = {addDogFavourite, removeDogFavourite};

export default connect(mapStateToProps, mapDispatchToProps)(DogCard)
