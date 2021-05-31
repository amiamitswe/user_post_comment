const commentReducer = (state, { payload, type }) => {
  switch (type) {
    case 'TEST':
      return {
        ...state,
        comments: {
          ...state.comments,
          name: 'Abir',
          count: state.comments.count + payload
        }
      }
    case 'TEST2':
      return {
        ...state,
        comments: {
          ...state.comments,
          name: 'Amit',
          count: state.comments.count - payload
        }
      }
    default:
      throw new Error()
  }
}

export default commentReducer