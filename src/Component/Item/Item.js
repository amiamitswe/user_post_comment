import React from 'react'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import classes from './Item.module.css'
import WornUser from '../WornUser/WornUser';

const Item = ({ postId, title, body, editAble, deleteItem, editItem }) => {
  const history = useHistory()

  // worn user for delete
  const warnUser = (e) => {
    e.target.nextElementSibling.classList.add("active");
  };

  // cancel delete
  const closePopover = (e) => {
    e.target.parentElement.parentElement.classList.remove("active");
  };

  // delete item handler
  const deleteItemHandler = async (e) => {
    deleteItem()
    closePopover(e)
  }

  // on click redirect to page details
  const onClickPostHandler = () => {
    history.push(`postDetails/${postId}`)
  }

  return (
    <div className={`${classes.Item} mb-2`}>
      <div className='mb-3'>
        <p className={classes.Title}><span className={classes.TagName}>Title</span>{title}</p>
        <p className={classes.Body}><span className={classes.TagName}>Body</span>{body}</p>
      </div>

      <div className='d-flex'>
        <button onClick={onClickPostHandler} className='btn btn-sm btn-primary mr-2'>Show Details</button>
        {editAble && <div className='position-relative'>
          <button onClick={editItem} className='btn btn-sm btn-info mr-2'>Edit</button>
          <button onClick={warnUser} className='btn btn-sm btn-danger'>Delete</button>

          <WornUser
            closePopover={closePopover}
            deleteConfirm={(e) => deleteItemHandler(e)}
          />
        </div>}
      </div>
    </div>
  )
}

export default Item


Item.propTypes = {
  postId: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}