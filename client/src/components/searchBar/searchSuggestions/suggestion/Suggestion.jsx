import React from 'react';
import {connect} from 'react-redux'
import { setQuery } from '../../../../redux/actions';
import './Suggestion.scss';

const Suggestion = ({name, setQuery}) => {

    const handleClick = () => {
        setQuery(name)
    }

    return (
        <li className="suggestion">
            <button className="suggestionLink" onClick={() => handleClick()}>{name}</button>
        </li>
    )
}

const mapStateToProps = state => ({
    query: state.query
  });

const mapDispatchToProps = {setQuery}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
