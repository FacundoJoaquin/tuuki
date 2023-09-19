import { useState } from 'react'
import tuki from '../../assets/tuki1.png'
import HelpIcon from '../atoms/HelpIcon'
import Modal from './Modal'
import ModalUser from './ModalUser'

const Avatar = () => {
const [showModal, setShowModal] = useState(false)
  
const handleShowModal = () => {
  setShowModal(!showModal)
}

  return (
    <div className="w-screen h-32 flex items-center relative overflow-x-hidden xs:h-28"> 
        <div className="h-20 w-20 rounded-full bg-white ml-8 overflow-hidden flex items-center border border-opacity-90 border-gray-200 shadow-xl">
          <img src={tuki} alt=""  className='p-4'/>
        </div>
          <h1 className=' text-interfaz-700 text-3xl text-center ml-12 font-extrabold'>BIENVENIDO</h1>
          <div className='absolute bg-interfaz-200 h-1 opacity-40 w-full ml-32 bottom-0 shadow-2xl'/>
          <div className='absolute right-2 top-2' onClick={handleShowModal}><HelpIcon /></div>
          {showModal == true && (
            <Modal>
              <ModalUser handleShowModal={handleShowModal}/>
            </Modal>
          )}
    </div>
  )
}

export default Avatar