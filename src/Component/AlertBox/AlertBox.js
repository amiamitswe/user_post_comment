import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap'
import classes from './AlertBox.module.css'

const AlertBox = ({ type, message }) => (
  <Alert className={classes.Alert} variant={type}>
    <Alert.Heading className='mb-0'>{message}</Alert.Heading>
  </Alert>
)

export default AlertBox

AlertBox.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}