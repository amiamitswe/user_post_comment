import React, { useEffect, useRef, useContext } from "react"
import { store } from "../../../../context/store"
import { CURRENT_PAGE, POST_PER_PAGE, POST_SORT_BY, SORT_USER_SAVE } from "../../../../context/Action/usersAction"
import PaginationItem from "../../../../Component/PaginationItem/PaginationItem"
import Select from "../../../../Component/Select/Select"
import { sortShortOptions } from "../../../../Utility/library"

const FilterUserData = () => {
  const { allUsers, allUsersDispatch } = useContext(store)
  const postPerPage = allUsers.postPerPage
  const currentPage = allUsers.currentPage
  const users = allUsers.data
  const sortOption = sortShortOptions

  const entriesRef = useRef()

  useEffect(() => {
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost)

    allUsersDispatch({ type: SORT_USER_SAVE, payload: currentPosts })
  }, [currentPage, postPerPage, users, allUsersDispatch])

  const handlePostPerPage = () => {
    setTimeout(() => {
      let getPostPerPage = (entriesRef.current.value)
      if (getPostPerPage >= 1) allUsersDispatch({ type: POST_PER_PAGE, payload: getPostPerPage })
      else getPostPerPage = 5
    }, 500)
  }

  // sort users on name and email
  const sortUsers = (e) => {
    const sortByOrder = e.target.value
    allUsersDispatch({ type: POST_SORT_BY, payload: sortByOrder })

    switch (sortByOrder) {
      case 'nameASC':
        allUsers.filteredData.sort((a, b) => {
          var nameA = a.name.toUpperCase()
          var nameB = b.name.toUpperCase()
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0;
        })
        break

      case 'nameDSC':
        allUsers.filteredData.sort((a, b) => {
          var nameA = a.name.toUpperCase()
          var nameB = b.name.toUpperCase()
          if (nameA > nameB) return -1
          if (nameA < nameB) return 1
          return 0;
        })

        break
      case 'emailASC':
        allUsers.filteredData.sort((a, b) => {
          var emailA = a.email.toUpperCase()
          var emailB = b.email.toUpperCase()
          if (emailA < emailB) return -1
          if (emailA > emailB) return 1
          return 0;
        })
        break

      case 'emailDSC':
        allUsers.filteredData.sort((a, b) => {
          var emailA = a.email.toUpperCase()
          var emailB = b.email.toUpperCase()
          if (emailA > emailB) return -1
          if (emailA < emailB) return 1
          return 0;
        })
        break

      default:
        return allUsers.filteredData
    }
    allUsersDispatch({ type: SORT_USER_SAVE, payload: allUsers.filteredData })
  }

  // set currentPage
  const setCurrentPage = (page) => allUsersDispatch({ type: CURRENT_PAGE, payload: page })

  return (
    <>
      <div className="col-lg-5">
        <div className="form-row">
          <div className="col-6">
            <div className="form-group">
              <label>Show Entries (default 5)</label>
              <input
                type="number"
                min={1}
                className="form-control"
                onChange={handlePostPerPage}
                defaultValue={postPerPage}
                ref={entriesRef}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-groups">
              <Select
                value={allUsers.sortBy}
                type="select"
                label='Sort By'
                changed={(e) => sortUsers(e)}
                options={sortOption}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-7">
        <PaginationItem
          postPerPage={postPerPage}
          totalPosts={users.length}
          currentPage={currentPage}
          paginate={setCurrentPage}
        />
      </div>
    </>
  )
}

export default FilterUserData
