import { Link } from 'react-router-dom';
import MenuIcon from '../../../UI/MenuIcon/MenuIcon';
import classes from './Header.module.css';

const Header = () => (
  <div className={classes.Header}>
    <div className={classes.HeaderWrapper}>
      <div className={classes.HeaderLeft}>
        <MenuIcon />
        <Link className='ml-4' to='/'>User Post Comment</Link>
      </div>
    </div>
  </div>
)

export default Header
