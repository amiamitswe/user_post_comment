
const initialUser = {
  userID: 2,
  userName: ''
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

const initialUsers = {
  data: [],
  filteredData: [],
  isLoading: true,
  error: null,
  postPerPage: 5,
  sortBy: '',
  currentPage: 1,
  searchString: ''
}

export { initialUser, initialPosts, initialMyPosts, initialUsers }