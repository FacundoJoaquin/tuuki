import tuki from '../../assets/tuki1.png'
const Avatar = () => {
  return (
    <div className="w-screen h-32 flex items-center relative overflow-x-hidden"> 
        <div className="h-20 w-20 rounded-full bg-white ml-8 overflow-hidden flex items-center border border-opacity-90 border-gray-200 shadow-xl">
          <img src={tuki} alt=""  className='p-4'/>
        </div>
          <h1 className=' text-interfaz-700 text-3xl text-center ml-12 font-extrabold'>BIENVENIDO</h1>
          <div className='absolute bg-interfaz-200 h-1 opacity-40 w-full ml-32 bottom-0 shadow-2xl'/>
    </div>
  )
}

export default Avatar