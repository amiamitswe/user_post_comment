
import { NavLink } from "react-router-dom"
import classes from './SidebarOption.module.css'
function SidebarOption(props) {
  const { to, title } = props;
  return (
    <NavLink
      to={to}
      className={classes.SidebarOption}
      activeClassName={classes.SidebarOptionActive}
    >
      {title}
    </NavLink>
  )
}

export default SidebarOption