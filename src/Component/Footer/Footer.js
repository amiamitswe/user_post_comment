
import classes from './Footer.module.css'

function Footer(props) {
  const { title, version } = props;
  return (
    <div className={classes.Footer}>
      <div className={classes.FooterContainer}>
        <p>{title}</p>
        <p>version: {version}</p>
      </div>
    </div>
  )
}

export default Footer