import React from 'react'
import { Alert } from 'react-bootstrap'
import classes from './AlertBox.module.css'

const AlertBox = ({ type, message }) => {
  return (
    <Alert className={classes.Alert} variant={type}>
      <Alert.Heading className='mb-0'>{message}</Alert.Heading>
    </Alert>
  )
}

export default AlertBox
