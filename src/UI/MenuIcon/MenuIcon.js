import './MenuIcon.css'
import User from '../../assets/profile.svg'
import { useHistory } from 'react-router'

function MenuIcon() {
  const history = useHistory()
  return (
    <div className="menuIcon" onClick={() => history.push('/')}>
      {/* <span className="line1"></span>
      <span className="line2"></span>
      <span className="line3"></span> */}
      <img src={User} className='img-fluid' alt="User" />
    </div>
  )
}

export default MenuIcon