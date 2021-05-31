import React, { useReducer } from 'react'
import commentReducer from './Reducer/commentReducer'
import initialPosts from './InitialState/initialPosts'
import postReducer from './Reducer/postReducer'

const commentInitialState = {
  comments: {
    name: 'Amit',
    count: 10
  }
}

const store = React.createContext(100)

const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, commentInitialState)

  const [posts, postDispatch] = useReducer(postReducer, initialPosts)

  return (
    <Provider value={{ dispatch, state, posts, postDispatch }}>
      {children}
    </Provider>
  )
}

export { store, StateProvider }