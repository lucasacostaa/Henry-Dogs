import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {changeFilters, resetPageNumber, resetDogsData} from '../../../redux/actions'
import './FilterMenu.scss'

const FilterMenu = ({changeFilters, resetPageNumber, resetDogsData}) => {
    const [selected, setSelected] = useState([]);
    const [tempSearch, setTempSearch] = useState("");
    const [temperaments, setTemperaments] = useState("")

    useEffect(() => {
        (async () => {
          const response = await axios.get("http://localhost:3001/temperament");
          setTemperaments(response.data);
        })();
      }, []);

    useEffect(() => {
      resetDogsData()
      resetPageNumber()
      changeFilters([...selected])
    }, [selected])

    const handleAddTemp = () => {
        setSelected([...selected, tempSearch]);
        setTempSearch("");
      };

    const tagDelete = (deleteTag) => {
        setSelected([...selected.filter((tag) => tag !== deleteTag)]);
      };

    return (
        <>
            <div className="dropable-input">
                <a role="button" className="btn-dropdown-filter">
                    Filter
                    <div className="vertical-divider"></div>
                    {selected && selected.map(el => <span className="tempTag">
                    {el}
                    <button
                      className="tempDelete"
                      type="button"
                      onClick={() => tagDelete(el)}
                    >
                      X
                    </button></span>)}
                    <input id="temp-input" type="text"
                    list="tags"
                    placeholder="Search temperaments"
                    onChange={(e) => setTempSearch(e.target.value)}
                    value={tempSearch}
                    style={{ textTransform: "capitalize" }}
                    ></input>
                    <datalist name="tags" id="tags">
                    {temperaments &&
                        temperaments.map((temp) => {
                        return <option key={temp} value={temp} />;
                        })}
                    </datalist>
                    <button
                    type="button"
                    id="add-filter"
                    style={{ width: "50%", marginTop: "10px" }}
                    onClick={() => handleAddTemp()}
                    >
                    Add filter
                    </button>
                </a>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = {
  changeFilters, resetPageNumber, resetDogsData
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu)
