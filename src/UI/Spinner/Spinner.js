import React from 'react'
import classes from './Spinner.module.css'

const Spinner = () => {
  return (
    <div className='text-center'>
      <div className={classes.SpinnerWrap}>
        <div className={classes.SpinnerDiv}>
          <div><div><div><div></div></div></div><div><div><div></div></div></div></div>
        </div>
      </div>
    </div>
  )
}

export default Spinner
