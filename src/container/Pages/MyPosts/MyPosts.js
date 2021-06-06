import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../../context/store'
import { RESET_ERROR, RESET_LOADING, SET_DATA, SET_ERROR, SET_LOADING, LOAD_MORE, DELETE_POST, SET_ACTION_DONE, RESET_ACTION_DONE, SET_EDITABLE_DATA, RESET_EDITABLE_DATA, UPDATE_POST, SAVE_NEW_POST } from '../../../context/Action/myActionTypes'
import { baseURL } from '../../../config.json'
import Item from '../../../Component/Item/Item'
import Spinner from '../../../UI/Spinner/Spinner'
import AlertBox from '../../../Component/AlertBox/AlertBox'
import AddEditModal from '../../../Component/Modal/AddEditModal'

const MyPosts = () => {
  const { user } = useContext(store)
  const { myPosts, myPostDispatch } = useContext(store)

  const [updateData, setUpdateData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [addNew, setAddNew] = useState(false)

  const userId = user.userID

  // --------------------------------------------------------------------------------------
  // fetch post from api using callback
  const fetchMyPosts = useCallback(async () => {
    try {
      const url = `users/${userId}/posts`
      const settings = {
        method: 'GET',
        type: "cors"
      }
      const response = await fetch(baseURL + url, settings)
      myPostDispatch({ type: SET_LOADING })
      if (response.ok) {
        const data = await response.json()
        myPostDispatch({ type: SET_DATA, payload: data })
        myPostDispatch({ type: RESET_ERROR })
        myPostDispatch({ type: RESET_LOADING })
      }
      else {
        let errorResponse = response;
        myPostDispatch({ type: SET_ERROR, payload: 'Error ' + errorResponse.status })
        myPostDispatch({ type: RESET_LOADING })
      }
    }
    catch (error) {
      console.log(error);
      myPostDispatch({ type: SET_ERROR, payload: 'Something Wrong' })
      myPostDispatch({ type: RESET_LOADING })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --------------------------------------------------------------------------------------
  // set posts data to context 
  useEffect(() => {
    if (myPosts.data.length === 0) {
      fetchMyPosts()
    }
  }, [myPosts.data.length, fetchMyPosts])

  // --------------------------------------------------------------------------------------
  // load more data handler 
  const loadMoreData = () => myPostDispatch({ type: LOAD_MORE, payload: 10 })

  // --------------------------------------------------------------------------------------
  // delete item handler 
  const deletePostHandler = async (id) => {
    try {
      const postId = id
      const url = `posts/${postId}`
      const settings = {
        method: 'DELETE',
        type: "cors"
      }
      const response = await fetch(baseURL + url, settings);
      if (response.ok) {
        myPostDispatch({ type: DELETE_POST, payload: id })
        myPostDispatch({ type: SET_ACTION_DONE, payload: { type: 'success', message: 'Delete Success' } })
      }
      else {
        console.log(response);
        myPostDispatch({ type: SET_ACTION_DONE, payload: { type: 'danger', message: 'Delete Failed' } })
      }
      setTimeout(() => { myPostDispatch({ type: RESET_ACTION_DONE }) }, 1500)
    }
    catch (error) {
      console.log(error);
    }
  }

  // --------------------------------------------------------------------------------------
  // edit Item Handler
  const editItemHandler = (id) => {
    myPostDispatch({ type: SET_EDITABLE_DATA, payload: id })
  }

  // --------------------------------------------------------------------------------------
  // st update able data to state
  useEffect(() => {
    if (myPosts.editAbleData) {
      setUpdateData(myPosts?.editAbleData)
    }
  }, [myPosts.editAbleData])

  // --------------------------------------------------------------------------------------
  // input onchange handler 
  const onChangeHandler = (e) => {
    const updateInfo = { ...updateData }
    updateInfo[e.target.name] = e.target.value
    setUpdateData(updateInfo)
  }

  // --------------------------------------------------------------------------------------
  // post update handler 
  const onUpdateHandler = async () => {
    try {
      const postId = updateData.id
      const url = `posts/${postId}`
      const settings = {
        method: 'PUT',
        type: "cors",
        body: JSON.stringify(updateData),
        headers: { 'Content-type': 'application/json; charset=UTF-8', },
      }

      setLoading(true)
      const response = await fetch(baseURL + url, settings)
      if (response.ok) {
        const data = await response.json()
        myPostDispatch({ type: UPDATE_POST, payload: { data, postId } })
        myPostDispatch({ type: SET_ACTION_DONE, payload: { type: 'success', message: 'Post UpDate Successfully' } })
      }
      else {
        // // add it when new data will be at database
        // console.log(response)
        // myPostDispatch({ type: SET_ACTION_DONE, payload: { type: 'danger', message: 'Post UpDate Failed' } })

        // // forcefully update data when data is not in database
        // // remove it when new data will be at database
        myPostDispatch({ type: UPDATE_POST, payload: { data: updateData, postId } })
        myPostDispatch({ type: SET_ACTION_DONE, payload: { type: 'success', message: 'Post UpDate Successfully' } })
      }

      myPostDispatch({ type: RESET_EDITABLE_DATA })
      setUpdateData(null)
      setLoading(false)
      setTimeout(() => { myPostDispatch({ type: RESET_ACTION_DONE }) }, 1500)
    } catch (error) {
      console.log(error)
    }
  }

  // --------------------------------------------------------------------------------------
  // post update cancel handler 
  const onCancelUpdateHandler = () => {
    myPostDispatch({ type: RESET_EDITABLE_DATA })
    setUpdateData(null)
  }

  // --------------------------------------------------------------------------------------
  // add new post handler
  const addNewPostHandler = async () => {
    try {
      if (updateData?.title && updateData?.body) {
        myPostDispatch({ type: RESET_ACTION_DONE })
        const newPostData = { userId, ...updateData }
        const url = `posts`
        const settings = {
          method: 'POST',
          type: "cors",
          body: JSON.stringify(newPostData),
          headers: { 'Content-type': 'application/json; charset=UTF-8', },
        }
        setLoading(true)
        const response = await fetch(baseURL + url, settings)
        if (response.ok) {
          const responseData = await response.json()
          myPostDispatch({ type: SAVE_NEW_POST, payload: responseData })
          myPostDispatch({ type: SET_ACTION_DONE, payload: { type: 'success', message: 'New Post successfully saved' } })
        }
        else {
          console.log(response)
          myPostDispatch({ type: SET_ACTION_DONE, payload: { type: 'danger', message: 'New Post save failed' } })
        }
        setAddNew(false)
        setLoading(false)
        setUpdateData(null)
      }
      else {
        myPostDispatch({ type: SET_ACTION_DONE, payload: { type: 'danger', message: 'All Fields Required' } })
      }
      setTimeout(() => myPostDispatch({ type: RESET_ACTION_DONE }), 1500)
    }
    catch (error) {
      console.log(error);
    }
  }

  // --------------------------------------------------------------------------------------
  // cancel add new post handler
  const cancelNewPostHandler = () => {
    setAddNew(false)
    setUpdateData(null)
  }

  // add or edit modal 
  const addEditModal = <AddEditModal
    loading={loading}
    updateData={updateData}
    onChangeHandler={onChangeHandler}
    editAble={myPosts.editAbleData ? true : false}
    open={(myPosts.editAbleData || addNew) ? true : false}
    onSubmit={myPosts.editAbleData ? onUpdateHandler : addNewPostHandler}
    onClose={myPosts.editAbleData ? onCancelUpdateHandler : cancelNewPostHandler}
  />

  return (
    <>
      {myPosts.deleteMessage.type && <AlertBox type={myPosts.deleteMessage.type} message={myPosts.deleteMessage.message} />}
      {addEditModal}
      <div className="row">
        <div className="col-6">
          <h3 className='mb-3'>My Posts</h3>
        </div>
        <div className='col-6'>
          <div className="d-flex justify-content-end align-items-center">
            <button onClick={() => setAddNew(true)} className='btn btn-md btn-info'>
              <FontAwesomeIcon className='mr-2' icon={faPlus} />Add New Post
            </button>
          </div>
        </div>

        <div className='col-12'>
          {myPosts.isLoading ? <Spinner /> :
            <>
              {myPosts.error ? <div className="alert alert-danger" role="alert">{myPosts.error}</div> :
                <>
                  {myPosts.data?.slice(0, myPosts.initialLoad).map(el =>
                    <Item
                      key={el.id}
                      postId={el.id}
                      editAble={myPosts.editAble}
                      title={el.title}
                      body={el.body}
                      deleteItem={() => deletePostHandler(el.id)}
                      editItem={() => editItemHandler(el.id)}
                    />
                  )}
                  {myPosts?.initialLoad >= myPosts.data?.length ?
                    <div className="alert alert-info" role="alert">No More Data Available !!!</div> :
                    <button
                      className='btn btn-md btn-primary mt-3'
                      onClick={loadMoreData}>Show More
                    <FontAwesomeIcon className='ml-3' icon={faEllipsisH} />
                    </button>}
                </>
              }
            </>
          }
        </div>

      </div>
    </>
  )
}

export default MyPosts
