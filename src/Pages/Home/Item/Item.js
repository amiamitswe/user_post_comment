import React from 'react'
import classes from './Item.module.css'

const Item = ({ title, body }) => {
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
    </div>
  )
}

export default Item
