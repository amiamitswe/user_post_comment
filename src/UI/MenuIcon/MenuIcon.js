import './MenuIcon.css'

function MenuIcon(props) {
  return (
    <div className="menuIcon" onClick={props.toggleMenu}>
      <span className="line1"></span>
      <span className="line2"></span>
      <span className="line3"></span>
    </div>
  )
}

export default MenuIcon