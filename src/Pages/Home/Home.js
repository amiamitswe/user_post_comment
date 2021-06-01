import React, { useCallback, useEffect, useState } from 'react'
import Item from '../../Component/Item/Item'
import { baseURL } from '../../config.json'

const Home = () => {

  const [allPost, setAllPost] = useState([])
  const [initialLoad, setInitialLoad] = useState(10)

  const fetchAllPosts = useCallback(async () => {
    try {
      const url = 'posts'
      const setting = {
        method: 'GET',
        type: "cors"
      }
      const response = await fetch(baseURL + url, setting)
      if (response.ok) {
        const data = await response.json()
        setAllPost(data)
        console.log(data);
      }
      else {
        let errorResponse = response;
        console.log('Error ' + errorResponse.status)
      }
    }
    catch (error) {
      console.log(error);
    }

  }, [])

  useEffect(() => {
    fetchAllPosts()
  }, [fetchAllPosts])


  const updateInitialLoad = () => {
    const preInitialLoad = initialLoad
    setInitialLoad(preInitialLoad + 10)
  }


  return (
    <div className="row">
      <div className="col-12">
        <h3 className='mb-3'>All Posts</h3>
        {allPost?.slice(0, initialLoad).map(el => <Item key={el.id} title={el.title} body={el.body} />)}
        {initialLoad >= allPost?.length ?
          <div className="alert alert-info" role="alert">
            No More Data Available !!!
              </div> :
          <button className='btn btn-md btn-primary mt-3' onClick={updateInitialLoad}>Show More</button>}
      </div>
    </div>
  )
}

export default Home
