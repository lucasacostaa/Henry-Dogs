import axios from "axios";

export const ADD_DOG_FAVOURITE = "ADD_DOG_FAVOURITE";
export const REMOVE_DOG_FAVOURITE = "REMOVE_DOG_FAVOURITE";
export const ADD_DOGS_DATA = "ADD_DOGS_DATA";
export const ADD_DOGS_DATA_DEFAULT = "ADD_DOGS_DATA_DEFAULT";
export const RESET_DOGS_DATA = "RESET_DOGS_DATA";
export const SET_DOG_DETAIL = "SET_DOG_DETAIL";
export const SET_LOADING = "SET_LOADING";
export const SET_HAS_MORE = "SET_HAS_MORE";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
export const RESET_PAGE_NUMBER = "RESET_PAGE_NUMBER";
export const SET_QUERY = "SET_QUERY";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const CHANGE_ORDER_BY = "CHANGE_ORDER_BY";
export const CHANGE_ONLY_CREATED = "CHANGE_ONLY_CREATED";
export const CHANGE_FILTERS = "CHANGE_FILTERS";
export const REMOVE_FILTER = "REMOVE_FILTER";


export function addDogFavourite(payload) {
  return { type: ADD_DOG_FAVOURITE, payload };
}

export function removeDogFavourite(payload) {
  return { type: REMOVE_DOG_FAVOURITE, payload };
}

export function changeOrder(payload){
  return { type: CHANGE_ORDER, payload };
}

export function changeOrderBy(payload){
  return { type: CHANGE_ORDER_BY, payload };
}

export function changeOnlyCreated(payload){
  return { type: CHANGE_ONLY_CREATED, payload}
}

export function changeFilters(payload){
  return { type: CHANGE_FILTERS, payload }
}

export function removeFilter(payload){
  return { type: REMOVE_FILTER, payload }
}

export function addDogsData(
  query,
  order,
  pageNumber,
  onlyCreated,
  orderBy
) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/dogs/?name=${query}`, {
        params: {
          order,
          orderBy,
          page: pageNumber,
          onlyCreated,
        },
      })
      .then((res) => {
        let dog = res.data.dogsFound ? res.data.dogsFound : res.data;
        dispatch({ type: ADD_DOGS_DATA, payload: dog });
        dispatch({
          type: SET_HAS_MORE,
          payload: res.data.paginationData.pagesLeft >= 1,
        });
      });
  };
}

export function addDogsDataDefault(
  query,
  order,
  pageNumber,
  onlyCreated,
  orderBy
) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/dogs/`, {
        params: {
          order,
          orderBy,
          page: pageNumber,
          onlyCreated,
        },
      })
      .then((res) => {
        let dog = res.data.dogsFound ? res.data.dogsFound : res.data;
        dispatch({ type: ADD_DOGS_DATA_DEFAULT, payload: dog });
        dispatch({
          type: SET_HAS_MORE,
          payload: res.data.paginationData.pagesLeft >= 1,
        });
      });
  };
}

export function resetDogsData(payload) {
  return { type: RESET_DOGS_DATA, payload };
}

export function setDogDetail(payload) {
  return { type: SET_DOG_DETAIL, payload };
}

export function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

export function setHasMore(payload) {
  return { type: SET_HAS_MORE, payload };
}

export function setPageNumber(payload) {
  return { type: SET_PAGE_NUMBER, payload };
}

export function resetPageNumber() {
  return { type: RESET_PAGE_NUMBER };
}

export function setQuery(payload) {
  return { type: SET_QUERY, payload };
}