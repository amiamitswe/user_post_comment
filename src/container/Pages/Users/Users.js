import React, { useCallback, useContext, useEffect, useState } from 'react'
import Pagination from '../../../Component/Pagination/Pagination'
import { store } from '../../../context/store';
import { baseURL } from '../../../config.json'
import { RESET_LOADING, SAVE_USERS, SET_LOADING } from '../../../context/Action/usersAction';
import Spinner from '../../../UI/Spinner/Spinner';

const Users = () => {
  const { allUsers, allUsersDispatch } = useContext(store)
  // eslint-disable-next-line no-unused-vars
  const [pageData, setPageData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [urlProps, setUrlProps] = useState({});

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
  }, [allUsers.data.length, fetchUsersData])

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className='userHeader mb-2'>
            <h3>All Users</h3>
            <div className="form-group w-25">
              <input type="text" className="form-control" placeholder="Search..." />
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
                        {allUsers.data.length > 0 &&
                          allUsers.data?.map((user) => (
                            <tr key={user.id}>
                              <td><span style={{ color: "#636363" }}>{user.name}</span></td>
                              <td><span style={{ color: "#636363" }}>{user.email}</span></td>
                              <td><span style={{ color: "#636363" }}>{user.website}</span></td>
                              <td>
                                <div className="actionButton">
                                  <button onClick={() => console.log(user.id)}>
                                    {/* <FontAwesomeIcon icon={faEye} /> */}
                                     V
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
                <Pagination pageData={pageData} changeUrlProps={setUrlProps} />
              </div>
            </>
          }
        </div>
      </div>

    </>
  )
}

export default Users
