import { SET_DATA, SET_LOADING, RESET_LOADING, SET_ERROR, RESET_ERROR, LOAD_MORE, DELETE_POST, SET_ACTION_DONE, RESET_ACTION_DONE, SET_EDITABLE_DATA, RESET_EDITABLE_DATA, UPDATE_POST, SAVE_NEW_POST } from '../Action/myActionTypes'

const myPostReducer = (state, { payload, type }) => {
  switch (type) {
    case SET_DATA:
      return {
        ...state,
        data: [...payload, ...state.data]
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
    case SAVE_NEW_POST:
      const oldPosts = [...state.data]
      oldPosts.unshift(payload)
      return {
        ...state,
        data: oldPosts
      }

    case DELETE_POST:
      const updateData = [...state.data]
      const findIndex = updateData.findIndex(el => el.id === payload)
      if (findIndex >= 0) {
        updateData.splice(findIndex, 1)
      }
      return {
        ...state,
        data: updateData
      }
    case SET_ACTION_DONE:
      return {
        ...state,
        deleteMessage: payload
      }

    case RESET_ACTION_DONE:
      return {
        ...state,
        deleteMessage: {}
      }

    case UPDATE_POST:
      const { data, postId } = payload
      const updatedData = [...state.data]
      const updatedDataIndex = updatedData.findIndex(el => el.id === postId)
      if (updatedDataIndex >= 0) {
        updatedData[updatedDataIndex] = data
      }
      return {
        ...state,
        data: updatedData
      }

    case SET_EDITABLE_DATA:
      const allData = [...state.data]
      const getIndex = allData.findIndex(el => el.id === payload)
      let getEditAbleData
      if (getIndex >= 0) {
        getEditAbleData = allData[getIndex]
      }
      return {
        ...state,
        editAbleData: getEditAbleData
      }
    case RESET_EDITABLE_DATA:
      return {
        ...state,
        editAbleData: null
      }

    default:
      throw new Error()
  }
}


export default myPostReducer