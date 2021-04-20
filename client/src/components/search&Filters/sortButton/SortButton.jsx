import React from "react";
import { connect } from "react-redux";
import {
  addDogsData,
  resetDogsData,
  setLoading,
  setHasMore,
  setPageNumber,
  setQuery,
  resetPageNumber,
  changeOrder,
  changeOrderBy,
  changeOnlyCreated
} from "../../../redux/actions/index";

import "./SortButton.scss";

const SortButton = ({
  query,
  order,
  orderBy,
  onlyCreated,
  pageNumber,
  resetPageNumber,
  resetDogsData,
  addDogsData,
  changeOrder,
  changeOrderBy,
  changeOnlyCreated,
  ...actions
}) => {

  const handleClickAbc = (newOrder) => {
    if(order === newOrder && orderBy === "name") return;
      (async () => {
        resetDogsData()
        await changeOrder(newOrder);
        await changeOrderBy("name");
        resetPageNumber();
        addDogsData(query, newOrder, pageNumber, onlyCreated, "name");
      })()
  };

  const handleClickWeight = (newOrder) => {
    if(order === newOrder && orderBy === "weight_avg") return;
    (async () => {
        resetDogsData()
        await changeOrder(newOrder)
        await changeOrderBy("weight_avg");
        resetPageNumber()
        addDogsData(query, newOrder, pageNumber, onlyCreated, "weight_avg");
    })()
  };

  return (
    <>
      <button onClick={() => handleClickAbc("ASC")}>A-Z</button>
      <button onClick={() => handleClickAbc("DESC")}>Z-A</button>
      <button onClick={() => handleClickWeight("ASC")}>
        Weight: Low to High
      </button>
      <button onClick={() => handleClickWeight("DESC")}>
        Weight: High to Low
      </button>
    </>
  );
};

const mapStateToProps = (state) => ({
  query: state.query,
  pageNumber: state.pageNumber,
  order: state.order,
  orderBy: state.orderBy,
  onlyCreated: state.onlyCreated
});

const mapDispatchToProps = {
  addDogsData,
  resetDogsData,
  setLoading,
  setHasMore,
  setPageNumber,
  setQuery,
  resetPageNumber,
  changeOrder,
  changeOrderBy,
  changeOnlyCreated
};

export default connect(mapStateToProps, mapDispatchToProps)(SortButton);
