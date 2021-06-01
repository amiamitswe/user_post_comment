import React, { useCallback, useContext, useEffect } from 'react'
import { store } from '../../context/store'
import { baseURL } from '../../config.json'
import Item from '../../Component/Item/Item'

import { LOAD_MORE, RESET_ERROR, RESET_LOADING, SAVE_POSTS, SET_ERROR, SET_LOADING } from '../../context/Action/postActionTypes'
import Spinner from '../../UI/Spinner/Spinner'


const Comment = () => {
  const { posts, postDispatch } = useContext(store)
  console.log(posts);

  const fetchAllPosts = useCallback(async () => {
    try {
      const url = 'posts'
      const setting = {
        method: 'GET',
        type: "cors"
      }
      const response = await fetch(baseURL + url, setting)
      postDispatch({ type: SET_LOADING })
      if (response.ok) {
        const data = await response.json()
        setTimeout(() => {
          postDispatch({ type: SAVE_POSTS, payload: data })
          postDispatch({ type: RESET_ERROR })
          postDispatch({ type: RESET_LOADING })
        }, 500)
      }
      else {
        let errorResponse = response;
        postDispatch({ type: SET_ERROR, payload: 'Error ' + errorResponse.status })
        postDispatch({ type: RESET_LOADING })
      }
    }
    catch (error) {
      console.log(error);
      postDispatch({ type: SET_ERROR, payload: 'Something Wrong' })
      postDispatch({ type: RESET_LOADING })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (posts.data.length === 0) {
      fetchAllPosts()
    }
  }, [posts.data.length, fetchAllPosts])


  const loadMoreData = () => {
    postDispatch({ type: LOAD_MORE, payload: 10 })
  }

  return (
    <div className="row">
      <div className="col-12">
        <h3 className='mb-3'>All Posts</h3>
        {posts.isLoading ? <Spinner /> :
          <>
            {posts.error ? <div className="alert alert-danger" role="alert">{posts.error}</div> :
              <>
                {posts.data?.slice(0, posts.initialLoad).map(el => <Item key={el.id} title={el.title} body={el.body} />)}
                {posts?.initialLoad >= posts.data?.length ?
                  <div className="alert alert-info" role="alert">No More Data Available !!!</div> :
                  <button className='btn btn-md btn-primary mt-3' onClick={loadMoreData}>Show More</button>}
              </>
            }
          </>
        }
      </div>
    </div>
  )
}

export default Comment
