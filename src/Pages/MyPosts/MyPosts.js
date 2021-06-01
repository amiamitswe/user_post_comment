import React, { useCallback, useContext, useEffect, useState } from 'react'
import { store } from '../../context/store'
import { baseURL } from '../../config.json'
import Item from '../../Component/Item/Item'
import { RESET_ERROR, RESET_LOADING, SET_DATA, SET_ERROR, SET_LOADING, LOAD_MORE, DELETE_POST, SET_DELETE_DONE, RESET_DELETE_DONE, SET_EDITABLE_DATA, RESET_EDITABLE_DATA, UPDATE_POST } from '../../context/Action/myActionTypes'
import Spinner from '../../UI/Spinner/Spinner'
import AlertBox from '../../UI/AlertBox/AlertBox'
import MyModal from '../../UI/Modal/Modal'
import { Form } from 'react-bootstrap'


const MyPosts = () => {
  const { myPosts, myPostDispatch } = useContext(store)
  const [updateData, setUpdateData] = useState(null)

  // console.log(myPosts.editAbleData);
  const fetchMyPosts = useCallback(async () => {
    try {
      const userId = 2
      const url = `users/${userId}/posts`
      const settings = {
        method: 'GET',
        type: "cors"
      }

      const response = await fetch(baseURL + url, settings)
      myPostDispatch({ type: SET_LOADING })
      if (response.ok) {
        const data = await response.json()
        setTimeout(() => {
          myPostDispatch({ type: SET_DATA, payload: data })
          myPostDispatch({ type: RESET_ERROR })
          myPostDispatch({ type: RESET_LOADING })
        }, 500)
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

  useEffect(() => {
    if (myPosts.data.length === 0) {
      fetchMyPosts()
    }
  }, [myPosts.data.length, fetchMyPosts])

  const loadMoreData = () => {
    myPostDispatch({ type: LOAD_MORE, payload: 10 })
  }

  // delete item handler 
  const deletePostHandler = async (id) => {
    const postId = id
    const url = `posts/${postId}`
    const settings = {
      method: 'DELETE',
      type: "cors"
    }
    const response = await fetch(baseURL + url, settings);
    if (response.ok) {
      myPostDispatch({ type: DELETE_POST, payload: id })
      myPostDispatch({ type: SET_DELETE_DONE, payload: { type: 'success', message: 'Delete Success' } })
      setTimeout(() => { myPostDispatch({ type: RESET_DELETE_DONE }) }, 1500)
    }
    else {
      console.log(response);
      myPostDispatch({ type: SET_DELETE_DONE, payload: { type: 'danger', message: 'Delete Failed' } })
      setTimeout(() => { myPostDispatch({ type: RESET_DELETE_DONE }) }, 1500)
    }
  }

  // edit Item Handler
  const editItemHandler = (id) => {
    myPostDispatch({ type: SET_EDITABLE_DATA, payload: id })
  }

  useEffect(() => {
    if (myPosts.editAbleData) {
      setUpdateData(myPosts?.editAbleData)
    }
  }, [myPosts.editAbleData])

  const onChangeHandler = (e) => {
    const updateInfo = { ...updateData }
    updateInfo[e.target.name] = e.target.value
    setUpdateData(updateInfo)
  }

  const onUpdateHandler = async () => {
    const postId = updateData.id
    const url = `posts/${postId}`
    const settings = {
      method: 'PUT',
      type: "cors",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(updateData)
    }

    const response = await fetch(baseURL + url, settings)
    if (response.ok) {
      const data = await response.json()
      myPostDispatch({ type: UPDATE_POST, payload: { data, id: postId } })
      setUpdateData(null)
      myPostDispatch({ type: RESET_EDITABLE_DATA })
    }
    else {
      console.log(response)
      setUpdateData(null)
      myPostDispatch({ type: RESET_EDITABLE_DATA })
    }
  }

  const onCancelUpdateHandler = () => {
    setUpdateData(null)
    myPostDispatch({ type: RESET_EDITABLE_DATA })
  }

  const modal = <MyModal open={(myPosts.editAbleData) ? true : false} onSubmit={onUpdateHandler} onClose={onCancelUpdateHandler} editAble={myPosts.editAbleData}>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control name='title' type="text" placeholder="Title" onChange={(e) => onChangeHandler(e)} value={updateData?.title || ''} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Body</Form.Label>
        <Form.Control name='body' as="textarea" rows={5} onChange={(e) => onChangeHandler(e)} value={updateData?.body || ''} />
      </Form.Group>
    </Form>
  </MyModal>

  return (
    <>
      {myPosts.deleteMessage.type && <AlertBox type={myPosts.deleteMessage.type} message={myPosts.deleteMessage.message} />}
      {modal}
      <div className="row">
        <div className="col-lg-9">
          <h3 className='mb-3'>My Posts</h3>
        </div>
        <div className='col-lg-3'>
          <div className="d-flex justify-content-end align-items-center">
            <button className='btn btn-md btn-info'>Add New Post</button>
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
                      editAble={myPosts.editAble}
                      title={el.title}
                      body={el.body}
                      deleteItem={() => deletePostHandler(el.id)}
                      editItem={() => editItemHandler(el.id)}
                    />
                  )}
                  {myPosts?.initialLoad >= myPosts.data?.length ?
                    <div className="alert alert-info" role="alert">No More Data Available !!!</div> :
                    <button className='btn btn-md btn-primary mt-3' onClick={loadMoreData}>Show More</button>}
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
