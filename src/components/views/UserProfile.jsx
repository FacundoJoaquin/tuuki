import React from 'react'
import Avatar from '../molecules/Avatar'
import Medals from '../molecules/Medallero.jsx'
import UserHistory from '../molecules/UserHistory.jsx'


const UserProfile = () => {
  return (
    <div className='flex flex-col'>
      <Avatar />
      <Medals />
      <UserHistory />

    </div>
  )
}

export default UserProfile