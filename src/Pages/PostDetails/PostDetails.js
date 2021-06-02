import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { baseURL } from '../../config.json'
import Spinner from '../../UI/Spinner/Spinner'
import Comment from './Comment/Comment'
import PageNotFound from '../PageNotFound/PageNotFound'

const PostDetails = () => {
  const { postId } = useParams()
  const history = useHistory()

  const [postDetails, setPostDetails] = useState({})
  const [allComments, setAllComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  // go back page function
  const goBackPage = () => {
    history.goBack()
    setLoading(false)
    setPostDetails({})
    setAllComments([])
    setErrorMessage(false)
  }

  // fetch post and comments data 
  const fetchPostData = useCallback(async () => {
    setLoading(true)
    try {
      const url = `posts/${postId}`
      const settings = {
        method: 'GET',
        type: "cors",
      }

      const response = await fetch(baseURL + url, settings)
      if (response.ok) {
        const details = await response.json()
        setPostDetails(details)
        const commentURL = `comments?postId=${postId}`

        const commentsResponse = await fetch(baseURL + commentURL, settings)
        if (commentsResponse.ok) {
          const comments = await commentsResponse.json()
          setAllComments(comments)
        }
        setErrorMessage(false)
      }
      else {
        setErrorMessage(true)
      }
      setLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }, [postId])

  // call fetch function
  useEffect(() => {
    fetchPostData()
  }, [fetchPostData])

  return (
    <div className="row">
      <div className="col-12">
        <h3 className=' d-flex'><button onClick={goBackPage} className='btn btn-sm btn-info mr-4'>Go Back</button>
          Post Details
        </h3>
        <hr />

        {loading ? <Spinner /> :
          <>
            {errorMessage ? <PageNotFound text='Post Data is not Available!!!' /> :
              <>
                <div className='mb-3'>
                  <h2>Post</h2>
                  <h4>{postDetails?.title}</h4>
                  <p>{postDetails?.body}</p>
                </div>

                <div className='ml-4'>
                  <h3>Comments</h3>
                  {allComments.length > 0 ?
                    allComments.map(el => <Comment key={el.id} name={el.name} email={el.email} body={el.body} />) :
                    <h2 className='text-center text-danger'>NO Comments Available !!!</h2>
                  }
                </div>
              </>
            }
          </>
        }

      </div>
    </div>
  )
}

export default PostDetails
