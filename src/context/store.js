import React, { createContext, useReducer } from 'react'
import postReducer from './Reducer/postReducer'
import myPostReducer from './Reducer/myPostReducer'
import usersReducer from './Reducer/usersReducer'
import { initialUser, initialPosts, initialMyPosts, initialUsers } from './InitialState/initialState'

const store = createContext()

const { Provider } = store

const StateProvider = ({ children }) => {
  const [user] = useReducer({}, initialUser)
  const [posts, postDispatch] = useReducer(postReducer, initialPosts)
  const [myPosts, myPostDispatch] = useReducer(myPostReducer, initialMyPosts)
  const [allUsers, allUsersDispatch] = useReducer(usersReducer, initialUsers)

  return (
    <Provider
      value={{
        user,
        posts,
        postDispatch,
        myPosts,
        myPostDispatch,
        allUsers,
        allUsersDispatch
      }}>
      {children}
    </Provider>
  )
}

export { store, StateProvider }