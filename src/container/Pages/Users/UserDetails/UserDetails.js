import React from 'react'
import { useParams } from 'react-router'

const UserDetails = () => {
  const { userId } = useParams()
  console.log(userId);
  return (
    <div>
      <h1>Hello World</h1>
      {userId}
    </div>
  )
}

export default UserDetails
