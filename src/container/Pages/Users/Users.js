import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { store } from '../../../context/store';
import { baseURL } from '../../../config.json'
import { POST_PER_PAGE, RESET_LOADING, SAVE_USERS, SEARCH_DATA, SEARCH_STRING, SET_LOADING } from '../../../context/Action/usersAction';
import Spinner from '../../../UI/Spinner/Spinner';
import FilterData from '../../../Component/FilterData/FilterData';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const entriesRef = useRef()
  const history = useHistory()
  const { allUsers, allUsersDispatch } = useContext(store)
  const searchString = allUsers.searchString
  const [pageData, setPageData] = useState({})

  const fetchUsersData = useCallback(async () => {
    try {
      const url = `users`
      const settings = {
        method: 'GET',
        type: "cors"
      }

      const response = await fetch(baseURL + url, settings)
      allUsersDispatch({ type: SET_LOADING })
      if (response.ok) {
        const userData = await response.json()
        setPageData(userData)
        allUsersDispatch({ type: SAVE_USERS, payload: userData })
        allUsersDispatch({ type: RESET_LOADING })
      }
      else {
        let errorResponse = response;
        console.log(errorResponse);
        // myPostDispatch({ type: SET_ERROR, payload: 'Error ' + errorResponse.status })
        allUsersDispatch({ type: RESET_LOADING })
      }
    }
    catch (error) {
      console.log(error);
      allUsersDispatch({ type: RESET_LOADING })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (allUsers.data.length === 0) {
      fetchUsersData()
    }
    else {
      setPageData(allUsers.filteredData)
    }
  }, [allUsers.data.length, fetchUsersData, allUsers.filteredData])


  const searchHandler = () => {
    const userData = allUsers.data
    allUsersDispatch({ type: SEARCH_STRING, payload: entriesRef.current.value.trim().toLowerCase() })
    allUsersDispatch({ type: POST_PER_PAGE, payload: 5 })

    if (searchString.length > 0) {
      const data = userData.filter(el => (
        el.name.toLowerCase().match(searchString) || el.email.toLowerCase().match(searchString) || el.website.toLowerCase().match(searchString)
      ))

      allUsersDispatch({ type: SEARCH_DATA, payload: data })
    }
  }

  useEffect(() => {
    if (searchString.length > 0) {
      searchHandler()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className='userHeader mb-2'>
            <h3>All Users</h3>
            <div className="form-group w-50">
              <input type="text" ref={entriesRef} className="form-control" value={searchString} onChange={searchHandler} placeholder="Search..." />
            </div>
          </div>
        </div>

        <div className="col-12">
          {allUsers.isLoading ? <Spinner /> :
            <>
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Website</th>
                          <th scope="col" className="text-right">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageData.length > 0 &&
                          pageData?.map((user) => (
                            <tr key={user.id}>
                              <td><span style={{ color: "#636363" }}>{user.name}</span></td>
                              <td><span style={{ color: "#636363" }}>{user.email}</span></td>
                              <td><span style={{ color: "#636363" }}>{user.website}</span></td>
                              <td>
                                <div className="actionButton">
                                  <button onClick={() => history.push(`/allUsers/${user.id}`)}>
                                    <FontAwesomeIcon icon={faEye} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
              <div className="row align-items-center">
                <FilterData />
              </div>
            </>
          }
        </div>
      </div>

    </>
  )
}

export default Users
