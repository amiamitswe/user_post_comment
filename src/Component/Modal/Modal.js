import { Button, Modal } from 'react-bootstrap'

const MyModal = ({ open, modalTitle, doneTextTitle, onSubmit, cancelText, onClose, loading, children }) => (
  <Modal show={open} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{modalTitle ? modalTitle : 'Modal'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button
        variant="secondary"
        onClick={onClose}
      >
        {cancelText ? cancelText : 'Cancel'}
      </Button>
      <Button
        className='d-flex align-items-center'
        variant="primary"
        onClick={onSubmit}
      >
        {doneTextTitle ? doneTextTitle : 'Done'}
        {loading && <span className="spinner-grow spinner-grow-sm ml-2" role="status" aria-hidden="true" />}
      </Button>
    </Modal.Footer>
  </Modal>
)

export default MyModal
