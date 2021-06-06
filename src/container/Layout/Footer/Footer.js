
import classes from './Footer.module.css'

const Footer = ({ title, version }) => (
  <div className={classes.Footer}>
    <div className={classes.FooterContainer}>
      <p>{title}</p>
      <p>version: {version}</p>
    </div>
  </div>
)

export default Footer