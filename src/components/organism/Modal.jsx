// eslint-disable-next-line react/prop-types
const Modal = ({ children }) => {
    return (


        <div className="fixed top-0 left-0 h-full w-full z-50 bg-black bg-opacity-60 flex justify-around items-center dark:rounded-2xl transition ease-in-out delay-150">
            <div className="h-2/ w-5/6 z-50 bg-white flex flex-col rounded-xl justify-around dark:bg-nmate-950">

                {children}
            </div>
        </div>)

}

export default Modal