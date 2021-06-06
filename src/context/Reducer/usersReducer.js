import { SAVE_USERS, SORT_USER_SAVE, POST_PER_PAGE, SET_LOADING, RESET_LOADING, POST_SORT_BY, CURRENT_PAGE, SEARCH_DATA, SEARCH_STRING } from "../Action/usersAction";

const usersReducer = (state, { payload, type }) => {
  switch (type) {
    case SAVE_USERS:
      return {
        ...state,
        data: [...payload]
      }

    case SEARCH_DATA:
      return {
        ...state,
        filteredData: [...payload]
      }

    case SEARCH_STRING:
      return {
        ...state,
        searchString: payload
      }

    case SORT_USER_SAVE:
      return {
        ...state,
        filteredData: [...payload]
      }

    case POST_PER_PAGE:
      return {
        ...state,
        postPerPage: payload
      }

    case POST_SORT_BY:
      return {
        ...state,
        sortBy: payload
      }

    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload
      }

    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case RESET_LOADING:
      return {
        ...state,
        isLoading: false
      }
    default:
      throw new Error()
  }
}

export default usersReducer