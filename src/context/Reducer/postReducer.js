import { LOAD_MORE, RESET_LOADING, SAVE_POSTS, SET_LOADING, SET_ERROR, RESET_ERROR } from '../Action/postActionTypes'

const postReducer = (state, { payload, type }) => {
  switch (type) {
    case SAVE_POSTS:
      return {
        ...state,
        data: [...payload, ...state.data],
      }

    case LOAD_MORE:
      return {
        ...state,
        initialLoad: state.initialLoad + payload
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
    case SET_ERROR:
      return {
        ...state,
        error: payload
      }

    case RESET_ERROR:
      return {
        ...state,
        error: null
      }

    default:
      throw new Error()
  }
}

export default postReducer