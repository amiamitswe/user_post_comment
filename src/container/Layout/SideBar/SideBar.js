import SidebarOption from './SideBarOption/SideBarOption'
import { faEdit, faNewspaper, faUsers } from '@fortawesome/free-solid-svg-icons'
import classes from './SideBar.module.css'

const Sidebar = () => (
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

export default Sidebar