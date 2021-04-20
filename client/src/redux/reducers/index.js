import { 
    ADD_DOG_FAVOURITE,
    REMOVE_DOG_FAVOURITE,
    ADD_DOGS_DATA,
    ADD_DOGS_DATA_DEFAULT,
    RESET_DOGS_DATA,
    SET_DOG_DETAIL,
    SET_HAS_MORE,
    SET_LOADING,
    SET_PAGE_NUMBER,
    RESET_PAGE_NUMBER,
    SET_QUERY,
    CHANGE_ORDER,
    CHANGE_ORDER_BY,
    CHANGE_FILTERS,
    CHANGE_ONLY_CREATED
} from "../actions";

const initialState = {
    dogs: [],
    favourites: [],
    dogDetail: [],
    loading: false,
    hasMore: false,
    pageNumber: 0,
    query: '',
    orderBy: 'name',
    order: 'ASC',
    filters: [],
    onlyCreated: false
};

function rootReducer(state = initialState, action){
    switch (action.type) {
        case ADD_DOG_FAVOURITE: 
            return {
                ...state,
                favourites: state.favourites.concat(action.payload)
            }
        
        case REMOVE_DOG_FAVOURITE:
            return {
                ...state,
                favourites: state.favourites.filter( dog => dog.name !== action.payload)
            }

        case ADD_DOGS_DATA:
                return {
                    ...state,
                    dogs: state.dogs.concat(action.payload)
                }

        case ADD_DOGS_DATA_DEFAULT:
        return {
            ...state,
            dogs: state.dogs.concat(action.payload)
        }

        case RESET_DOGS_DATA:
            return {
                ...state,
                dogs: []
            }
        
        case SET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }
        
        case SET_LOADING:
        return {
            ...state,
            loading: action.payload
        }

        case SET_HAS_MORE:
        return {
            ...state,
            hasMore: action.payload
        }

        case SET_PAGE_NUMBER:
        return {
            ...state,
            pageNumber: state.pageNumber + 1
        } 

        case RESET_PAGE_NUMBER:
        return {
            ...state,
            pageNumber: 0
        } 

        case SET_QUERY:
        return {
            ...state,
            query: action.payload
        }

        case CHANGE_ORDER:
        return {
            ...state,
            order: action.payload
        }

        case CHANGE_ORDER_BY:
        return {
            ...state,
            orderBy: action.payload
        }

        case CHANGE_FILTERS:
        return {
            ...state,
            filters: action.payload
        }

        case CHANGE_ONLY_CREATED:
        return{
            ...state,
            onlyCreated: action.payload
        }

        default:
            return state
    }
}

export default rootReducer;