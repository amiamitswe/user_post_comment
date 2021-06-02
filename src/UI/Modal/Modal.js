import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const MyModal = ({ open, editAble, children, onSubmit, onClose, loading }) => {

  return (
    <div>
      <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editAble ? 'Edit Post' : 'New Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button className='d-flex align-items-center' variant="primary" onClick={onSubmit}>
            {editAble ? 'Update Post' : 'Save Post'}
            {loading && <span className="spinner-grow spinner-grow-sm ml-2" role="status" aria-hidden="true" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MyModal
