const commentInitialState = {
  comments: {
    name: 'Amit',
    count: 10
  }
}

const initialPosts = {
  data: [],
  error: null,
  initialLoad: 10,
  isLoading: true,
}

const initialMyPosts = {
  data: [],
  error: null,
  isLoading: true,
  initialLoad: 10,
  editAble: true,
  deleteMessage: {},
  editAbleData: null
}

export { commentInitialState, initialPosts, initialMyPosts }