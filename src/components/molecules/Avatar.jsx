import { useState } from 'react'
import tuki from '../../assets/tuki1.png'
import HelpIcon from '../atoms/HelpIcon'
import ModalUser from './ModalUser'
import Modal from '../organism/Modal'

const Avatar = () => {
const [showModal, setShowModal] = useState(false)
  
const handleShowModal = () => {
  setShowModal(!showModal)
}

  return (
    <div className="w-screen h-32 flex items-center relative overflow-x-hidden xs:h-28 dark:bg-slate-800"> 
        <div className="h-20 w-20 rounded-full bg-white ml-8 overflow-hidden flex items-center border border-opacity-90 border-gray-200 shadow-xl dark:bg-slate-500 dark:border-slate-700">
          <img src={tuki} alt=""  className='p-4'/>
        </div>
          <h1 className=' text-interfaz-700 text-3xl text-center ml-12 font-extrabold dark:text-gray-300'>BIENVENIDO</h1>
          <div className='absolute bg-interfaz-200 h-1 opacity-40 w-full ml-32 bottom-0 shadow-2xl'/>
          <div className='absolute right-2 top-2' onClick={handleShowModal}><HelpIcon dark={'dark:text-gray-300'}/></div>
          {showModal == true && (
            <Modal>
              <ModalUser handleShowModal={handleShowModal}/>
            </Modal>
          )}
    </div>
  )
}

export default Avatar