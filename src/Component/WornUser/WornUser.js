import PropTypes from 'prop-types'
import './WornUser.css'

const WornUser = ({ closePopover, deleteConfirm }) => (
  <div className="delete__popover">
    <h4 className='text-danger'> Are you sure?</h4>
    <div className="delete__popoverButtons">
      <button className="no" onClick={closePopover} >No</button>
      <button className="yes" onClick={(e) => deleteConfirm(e)} >Yes</button>
    </div>
  </div>
)

export default WornUser

WornUser.propTypes = {
  closePopover: PropTypes.func.isRequired,
  deleteConfirm: PropTypes.func.isRequired,
}