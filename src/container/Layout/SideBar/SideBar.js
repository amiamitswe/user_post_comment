import SidebarOption from './SideBarOption/SideBarOption'
import classes from './SideBar.module.css'

const Sidebar = () => {
  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarContainer}>
        <div className={classes.SidebarWrapper}>
          <>
            <SidebarOption to="/post" title="Post" />
            <SidebarOption to="/myPosts" title="My Posts" />
            <SidebarOption to="/allUsers" title="All Users" />
          </>
        </div>
      </div>
    </div>
  )
}

export default Sidebar