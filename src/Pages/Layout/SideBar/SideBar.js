
import SidebarOption from './SideBarOption/SideBarOption'
import classes from './SideBar.module.css'

function Sidebar() {
  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarContainer}>
        <div className={classes.SidebarWrapper}>
          <>
            <SidebarOption to="/home" title="Home" />
            <SidebarOption to="/post" title="Post" />
            <SidebarOption to="/comments" title="Comments" />
          </>
        </div>
      </div>
    </div>
  )
}

export default Sidebar