import React, { createContext, useReducer } from 'react'
import { commentInitialState, initialUser, initialPosts, initialMyPosts } from './InitialState/initialState'
import commentReducer from './Reducer/commentReducer'
import postReducer from './Reducer/postReducer'
import myPostReducer from './Reducer/myPostReducer'

const store = createContext()

const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, commentInitialState)
  const [user] = useReducer({}, initialUser)
  const [posts, postDispatch] = useReducer(postReducer, initialPosts)
  const [myPosts, myPostDispatch] = useReducer(myPostReducer, initialMyPosts)

  return (
    <Provider value={{ dispatch, state, user, posts, postDispatch, myPosts, myPostDispatch }}>
      {children}
    </Provider>
  )
}

export { store, StateProvider }