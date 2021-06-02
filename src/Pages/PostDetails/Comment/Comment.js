import React from 'react'
import classes from './Comment.module.css'

const Comment = ({ name, email, body }) => {
  return (
    <div className={classes.Comment}>
      <p><span>Comment :</span> {body}</p>
      <div className='d-flex justify-content-between'>
        <p className={classes.Commenter}>Comment By : {name}</p>
        <p className={classes.Commenter}>Email : {email}</p>
      </div>
    </div>
  )
}

export default Comment
