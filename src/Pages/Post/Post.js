import React, { useCallback, useContext, useEffect, useState } from 'react'
import { store } from '../../context/store'
import Item from '../Home/Item/Item'
import { baseURL } from '../../config.json'
import getContacts from '../../context/Action/Posts/getPosts'

const Comment = () => {
  const data = useContext(store)
  const { posts, postDispatch } = useContext(store)
  console.log(data);

  // const [allPost, setAllPost] = useState([])
  // const [initialLoad, setInitialLoad] = useState(10)

  useEffect(() => {
    if (posts.data.length === 0) {
      getContacts(postDispatch)
    }
  }, [])

  // const fetchAllPosts = useCallback(async () => {
  //   try {
  //     const url = 'posts'
  //     const setting = {
  //       method: 'GET',
  //       type: "cors"
  //     }
  //     const response = await fetch(baseURL + url, setting)
  //     if (response.ok) {
  //       const data = await response.json()
  //       postDispatch({ type: 'SAVE_POSTS', payload: data })
  //     }
  //     else {
  //       let errorResponse = response;
  //       console.log('Error ' + errorResponse.status)
  //     }
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }

  // }, [])

  // useEffect(() => {
  //   fetchAllPosts()
  // }, [fetchAllPosts])

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="brand__headLeft">
            <div className="brand__title">
              <h3>Posts </h3>
              {/* <button onClick={() => dispatch({ type: 'TEST', payload: 1 })} className='btn btn-sm btn-info mr-3'>Click ME 1</button>

              <button onClick={() => dispatch({ type: 'TEST2', payload: 1 })} className='btn btn-sm btn-info'>Click ME 2</button> */}

              <div className='pt-3'>
                {posts.data?.map(el => <Item key={el.id} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Comment
