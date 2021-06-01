import React, { useContext } from 'react'
import { store } from '../../context/store'

const Comment = () => {
  const data = useContext(store)
  const { dispatch, state } = useContext(store)
  console.log(data);
  return (
    <div className="row">
      <div className="col-12">
        <h3>{state.comments.name}</h3>
        <h3>Comment {state.comments.count}</h3>
        <button onClick={() => dispatch({ type: 'TEST', payload: 1 })} className='btn btn-sm btn-info mr-3'>Click ME 1</button>

        <button onClick={() => dispatch({ type: 'TEST2', payload: 1 })} className='btn btn-sm btn-info'>Click ME 2</button>
      </div>
    </div>
  )
}

export default Comment
