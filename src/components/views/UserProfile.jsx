import Avatar from '../molecules/Avatar'
import Medals from '../molecules/Medallero.jsx'
import UserHistory from '../molecules/UserHistory.jsx'


const UserProfile = () => {
  return (
    <div className='flex flex-col dark:bg-nmate-950'>
      <Avatar />
      <Medals />
      <UserHistory />

    </div>
  )
}

export default UserProfile