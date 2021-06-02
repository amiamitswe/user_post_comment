import { SAVE_USERS, SET_LOADING, RESET_LOADING } from "../Action/usersAction";


const usersReducer = (state, { payload, type }) => {
  switch (type) {
    case SAVE_USERS:
      return {
        ...state,
        data: [...payload, ...state.data]
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