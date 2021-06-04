import { faDonate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom"
import classes from './SidebarOption.module.css'
const SidebarOption = (props) => {
  const { to, title } = props;
  return (
    <NavLink
      to={to}
      className={classes.SidebarOption}
      activeClassName={classes.SidebarOptionActive}
    >
      <FontAwesomeIcon className='mr-2' icon={props.icon ? props.icon : faDonate} />
      {title}
    </NavLink>
  )
}

export default SidebarOption