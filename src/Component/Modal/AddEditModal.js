import { faEdit, faPenAlt, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'
import MyModal from './Modal'

const AddEditModal = ({ open, onSubmit, onClose, editAble, onChangeHandler, updateData, loading }) => {

  let doneTextTitle
  let modalTitle
  const cancel = <><FontAwesomeIcon className='mr-2' icon={faTimes} /> Close </>

  if (editAble) {
    doneTextTitle = <><FontAwesomeIcon className='mr-2' icon={faEdit} /> Update Post </>
    modalTitle = <>Edit Post<FontAwesomeIcon className='ml-2 text-info' icon={faPenAlt} />  </>
  }
  else {
    doneTextTitle = <><FontAwesomeIcon className='mr-2' icon={faSave} /> Save Post </>
    modalTitle = <>New Post<FontAwesomeIcon className='ml-2 text-info' icon={faSave} /></>
  }

  return (
    <MyModal
      open={open}
      onSubmit={onSubmit}
      onClose={onClose}
      editAble={editAble}
      loading={loading}
      doneTextTitle={doneTextTitle}
      modalTitle={modalTitle}
      cancelText={cancel}
    >
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name='title'
            type="text"
            placeholder="Title ..."
            value={updateData?.title || ''}
            onChange={(e) => onChangeHandler(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body</Form.Label>
          <Form.Control
            rows={5}
            name='body'
            as="textarea"
            value={updateData?.body || ''}
            placeholder='Description here ...'
            onChange={(e) => onChangeHandler(e)}
          />
        </Form.Group>
      </Form>
    </MyModal>
  )
}

export default AddEditModal
