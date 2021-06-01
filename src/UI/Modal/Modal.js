import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const MyModal = ({ open, editAble, children, onSubmit, onClose }) => {

  return (
    <div>
      <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editAble ? 'Edit Post' : 'New Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            {editAble ? 'Cancel Update' : 'Close'}
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            {editAble ? 'Update Post' : 'Save Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MyModal
