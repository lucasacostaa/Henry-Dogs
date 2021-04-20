import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addDogsData,
  resetDogsData,
  setLoading,
  setHasMore,
  setPageNumber,
  setQuery,
  resetPageNumber,
  addDogsDataDefault,
  changeOnlyCreated
} from "../../redux/actions/index";

import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import "./SearchBar.scss";

const SearchBar = ({
  pageNumber,
  query,
  order,
  onlyCreated,
  filters,
  orderBy,
  setQuery,
  addDogsData,
  resetDogsData,
  resetPageNumber,
  addDogsDataDefault,
  changeOnlyCreated
}) => {
  // const [query, setQuery] = useState('');
  // const [input, setInput] = useState('')
  const [type, setType] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
      if(query === "") {
        addDogsDataDefault(query, order, pageNumber, onlyCreated, orderBy)
      } else{
        addDogsData(query, order, pageNumber, onlyCreated, orderBy);
      }
  }, [query, pageNumber, filters]);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetDogsData();
    setType(!type);
    setQuery(input);
  }

  const handleClick = (created) => {
    resetDogsData();
    resetPageNumber();
    changeOnlyCreated(created)
    addDogsData(query, "ASC", pageNumber, created);
  };

  return (
    <>
      <div className="wrapper">
        <IconContext.Provider value={{ size: 35, color: "#89898d" }}>
          <>
            <BiSearch />
          </>
        </IconContext.Provider>

        <form
          className="js-search-input-form search-input-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            id="search-input"
            value={input}
            onChange={(e) => handleChange(e)}
          ></input>
        </form>
        <div className="vertical-divider"></div>
        <button className="btn-dropdown" onClick={() => handleClick(false)}>
          All
        </button>
        <button className="btn-dropdown2" onClick={() => handleClick(true)}>
          Only created
        </button>
      </div>
      {/* <div className="suggestions-container">
                <SearchSuggestions suggestions={suggestions}/>
            </div> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  suggestions: state.searchSuggestions,
  pageNumber: state.pageNumber,
  query: state.query,
  order: state.order,
  orderBy: state.orderBy,
  filters: state.filters,
  onlyCreated: state.onlyCreated
});

const mapDispatchToProps = {
  setLoading,
  setQuery,
  addDogsData,
  resetDogsData,
  setHasMore,
  setPageNumber,
  resetPageNumber,
  addDogsDataDefault,
  changeOnlyCreated
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
