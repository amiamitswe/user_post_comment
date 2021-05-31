
import { Link } from 'react-router-dom';
import MenuIcon from '../../../UI/MenuIcon/MenuIcon';
import './Header.css';


function Header() {

  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__left">
          <MenuIcon toggleMenu={() => { }} />
          <Link className='ml-4' to='/'>User
          </Link>
        </div>
        <div className="header__right">
        </div>
      </div>
    </div>
  )
}

export default Header