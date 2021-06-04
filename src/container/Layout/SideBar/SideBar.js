import SidebarOption from './SideBarOption/SideBarOption'
import classes from './SideBar.module.css'
import { faEdit, faNewspaper, faUsers } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarContainer}>
        <div className={classes.SidebarWrapper}>
          <>
            <SidebarOption to="/post" title="Posts" icon={faNewspaper} />
            <SidebarOption to="/myPosts" title="My Posts" icon={faEdit} />
            <SidebarOption to="/allUsers" title="All Users" icon={faUsers} />
          </>
        </div>
      </div>
    </div>
  )
}

export default Sidebar