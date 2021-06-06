import { ReactComponent as User } from '../../assets/profile.svg'
import { useHistory } from 'react-router'
import classes from './MenuIcon.module.css'

const MenuIcon = () => {
  const history = useHistory()
  const menuIconAction = () => history.push('/')

  return (
    <div className={classes.menuIcon} onClick={menuIconAction}>
      <User src={User} className='img-fluid' alt="User" />
    </div>
  )
}

export default MenuIcon