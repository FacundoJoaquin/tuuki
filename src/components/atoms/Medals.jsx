import MedalAcount from "../../assets/MedalAcount.png"
import YellowStar from "../../assets/YellowStar.png"
import comment from "../../assets/comment.png"
import FirstPin from "../../assets/FirstPin.png"
import { useState } from "react";
import Modal from "../organism/Modal";
import ModalUser from "../molecules/ModalUser";

const Medals = ({ achieved, achievementData }) => {
    const medalClass = achieved ? '' : 'grayscale';
    const [modal, setModal] = useState(false)

    const handleShowModal = () => {
        setModal(!modal)
    }



    const { complete, key } = achievementData;
    let imageSrc
    if (key === 'firstLogin') {
        imageSrc = MedalAcount;
    } else if (key === 'firstComment') {
        imageSrc = comment;
    } else if (key === 'firstControl') {
        imageSrc = FirstPin;
    }


    return (
        <div onClick={handleShowModal}
            className='border border-gray-200 dark:border-nmate-400 dark:bg-nmate-800 p-2 shadow-2xl rounded-t-full rounded-b-full flex items-center justify-center flex-col gap-4 relative'>
            <img src={imageSrc} className='h-12 my-1 xs:h-11' alt="" />
            <div className='absolute h-px bg-gray-300 w-full top-1/2 opacity-70'></div>
            <div className={`h-12 ${medalClass} xs:h-11`}>
                <img src={YellowStar} alt="" className='h-10 mb-1 xs:h-9' />
            </div>
            {modal && (<Modal>
                <ModalUser handleShowModal={handleShowModal}/>
            </Modal>)}
        </div>
    );
};

export default Medals;
