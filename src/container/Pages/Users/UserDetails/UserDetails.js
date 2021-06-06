import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router'
import Spinner from '../../../../UI/Spinner/Spinner'
import PageNotFound from '../../PageNotFound/PageNotFound'
import { baseURL } from '../../../../config.json'
import Item from '../../../../Component/Item/Item'
import PaginationItem from '../../../../Component/PaginationItem/PaginationItem'
import Select from '../../../../Component/Select/Select'
import { selectFilterItemForUserPost } from '../../../../Utility/library'


const UserDetails = () => {
  const { userId } = useParams()
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(5)
  const [userDetails, setUserDetails] = useState({})
  const [currentPosts, setCurrentPosts] = useState([])
  const [errorMessage, setErrorMessage] = useState(false)
  const [allPostsByUser, setAllPostsByUser] = useState([])

  const selectItem = selectFilterItemForUserPost

  // go back page function
  const goBackPage = () => {
    history.goBack()
    setLoading(false)
    setUserDetails({})
    setAllPostsByUser([])
    setErrorMessage(false)
    setCurrentPosts([])
  }

  // fetch post and comments data 
  const fetchUserData = useCallback(async () => {
    setLoading(true)
    try {
      const url = `users/${userId}`
      const settings = {
        method: 'GET',
        type: "cors",
      }

      const response = await fetch(baseURL + url, settings)
      if (response.ok) {
        const details = await response.json()
        setUserDetails(details)
        const postURL = `posts?userId=${userId}`

        const postResponse = await fetch(baseURL + postURL, settings)
        if (postResponse.ok) {
          const posts = await postResponse.json()
          setAllPostsByUser(posts)
        }
        setErrorMessage(false)
      }
      else setErrorMessage(true)
      setLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }, [userId])

  // call fetch function
  useEffect(() => fetchUserData(), [fetchUserData])

  useEffect(() => {
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = allPostsByUser.slice(indexOfFirstPost, indexOfLastPost)

    setCurrentPosts(currentPosts)
  }, [postPerPage, currentPage, allPostsByUser])

  // set current page handler 
  const setCurrentPageHandler = (page) => setCurrentPage(page)

  return (
    <div className="row">
      <div className="col-12">
        <h3 className=' d-flex'>
          <button onClick={goBackPage} className='btn btn-sm btn-info mr-4'>
            <FontAwesomeIcon className='mr-2' icon={faArrowLeft} />Go Back</button>
            User Details
        </h3>
        <hr />
        {loading ? <Spinner /> :
          <>
            {errorMessage ? <PageNotFound text='User Data is not Available!!!' /> :
              <>
                <div className='mb-3'>
                  <h2>User</h2>
                  {userDetails.name ? <div>
                    <h4>Username : {userDetails.username.toLowerCase()}</h4>
                    <h4>Name : {userDetails.name}</h4>
                    <h5>Email : {userDetails.email}</h5>
                    <p>Phone : {userDetails.phone}</p>
                    <p>Website : {userDetails.website}</p>

                    <p className='company'>
                      <span>Company :</span>
                      <span className='ml-1'>{userDetails.company.name},</span>
                      <span className='ml-1'>{userDetails.company.catchPhrase},</span>
                      <span className='ml-1'>{userDetails.company.bs}</span>
                    </p>
                    <p>
                      <span>Location :</span>
                      <span className='ml-1'>{userDetails.address.street},</span>
                      <span className='ml-1'>{userDetails.address.suite},</span>
                      <span className='ml-1'>{userDetails.address.city},</span>
                      <span className='ml-1'>{userDetails.address.zipcode},</span>
                      <span className='ml-1'>{`Lat: ${userDetails.address.geo.lat}, Lon: ${userDetails.address.geo.lng}`}</span>
                    </p>
                  </div> : null}
                </div>
                <div className='ml-4'>
                  <h3>Posts</h3>
                  {currentPosts.length > 0 ?
                    <>
                      {currentPosts.map(el =>
                        <Item key={el.id} postId={el.id} title={el.title} body={el.body} />
                      )}
                      <div className="row">
                        <div className='col-4'>
                          <div className="form-groups">
                            <Select type="select" label='Items'
                              value={postPerPage}
                              changed={(e) => setPostPerPage(e.target.value)}
                              options={selectItem} />
                          </div>
                        </div>
                        <div className="col-8">
                          <label className='d-block text-right'>Go Page</label>
                          <PaginationItem
                            postPerPage={postPerPage}
                            totalPosts={allPostsByUser.length}
                            currentPage={currentPage}
                            paginate={setCurrentPageHandler}
                          />
                        </div>
                      </div>
                    </>
                    :
                    <h2 className='text-center text-danger'>NO Posts Available !!!</h2>
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

export default UserDetails
