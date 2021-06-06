import classes from './Spinner.module.css'

const Spinner = () => (
  <div className='text-center'>
    <div className={classes.SpinnerWrap}>
      <div className={classes.SpinnerDiv}>
        <div><div><div><div></div></div></div><div><div><div></div></div></div></div>
      </div>
    </div>
  </div>
)

export default Spinner
