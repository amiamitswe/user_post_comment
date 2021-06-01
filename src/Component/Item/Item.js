import React from 'react'
import classes from './Item.module.css'

const Item = ({ title, body, editAble, deleteItem, editItem }) => {

  const warnUser = (e) => {
    e.target.nextElementSibling.classList.add("active");
  };
  const closePopover = (e) => {
    e.target.parentElement.parentElement.classList.remove("active");
  };

  const deleteItemHandler = async (e) => {
    deleteItem()
    closePopover(e)
  }

  return (
    <div className={`${classes.Item} mb-2`}>
      <p className={classes.Title}>
        <span className="badge badge-info mr-2">Title</span>
        {title}
      </p>
      <p className={classes.Body}>
        <span className="badge badge-primary mr-2">Body</span>
        {body}
      </p>

      {editAble && <div className='mt-3 position-relative'>
        <button onClick={editItem} className='btn btn-sm btn-info mr-2'>Edit</button>
        <button onClick={warnUser} className='btn btn-sm btn-danger'>Delete</button>


        <div className="delete__popover">
          <h4 className='text-danger'> Are you sure?</h4>
          <div className="delete__popoverButtons">
            <button className="no" onClick={closePopover} > No </button>
            <button className="yes" onClick={(e) => deleteItemHandler(e)} > Yes </button>
          </div>
        </div>

      </div>}
    </div>
  )
}

export default Item
