// eslint-disable-next-line react/prop-types
const Modal = ({ children }) => {
    return (


        <div className="fixed top-0 left-0 h-screen w-full z-50 bg-black bg-opacity-60 flex justify-around items-center ">
            <div className="h-3/5 w-2/3 z-50 bg-white flex flex-col rounded-lg justify-around">
                {children}
            </div>
        </div>)

}

export default Modal