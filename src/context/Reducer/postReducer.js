const postReducer = (state, { payload, type }) => {
  switch (type) {
    case 'SAVE_POSTS':

      console.log(payload);
      return {
        ...state,
        // data: [...payload, ...state.data],
        isLoading: true

      }

    default:
      throw new Error()
  }
}

export default postReducer