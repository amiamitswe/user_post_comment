import React from 'react'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import classes from './Item.module.css'

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
      <div className='hover mb-3' onClick={onClickPostHandler} data-toggle="tooltip" data-placement="top" title="Click to se details">
        <p className={classes.Title}><span className="badge badge-info mr-2">Title</span>{title}</p>
        <p className={classes.Body}><span className="badge badge-primary mr-2">Body</span>{body}</p>
      </div>

      {editAble && <div className='position-relative'>
        <button onClick={editItem} className='btn btn-sm btn-info mr-2'>Edit</button>
        <button onClick={warnUser} className='btn btn-sm btn-danger'>Delete</button>

        <div className="delete__popover">
          <h4 className='text-danger'> Are you sure?</h4>
          <div className="delete__popoverButtons">
            <button className="no" onClick={closePopover} >No</button>
            <button className="yes" onClick={(e) => deleteItemHandler(e)} >Yes</button>
          </div>
        </div>

      </div>}
    </div>
  )
}

export default Item


Item.propTypes = {
  postId: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}