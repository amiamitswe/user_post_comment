import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPenAlt, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap'

const MyModal = ({ open, editAble, children, onSubmit, onClose, loading }) => {

  const editPostTitle = <>Edit Post<FontAwesomeIcon className='ml-2 text-info' icon={faPenAlt} />  </>
  const addNewPostTitle = <>New Post<FontAwesomeIcon className='ml-2 text-info' icon={faSave} /></>
  const updatePost = <><FontAwesomeIcon className='mr-2' icon={faEdit} /> Update Post </>
  const savePost = <><FontAwesomeIcon className='mr-2' icon={faSave} /> Save Post </>
  const cancel = <><FontAwesomeIcon className='mr-2' icon={faTimes} /> Close </>

  return (
    <div>
      <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editAble ? editPostTitle : addNewPostTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            {cancel}
          </Button>
          <Button className='d-flex align-items-center' variant="primary" onClick={onSubmit}>
            {editAble ? updatePost : savePost}
            {loading && <span className="spinner-grow spinner-grow-sm ml-2" role="status" aria-hidden="true" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MyModal
