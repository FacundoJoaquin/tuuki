import { useSelector } from 'react-redux';
import Map from '../organism/Map.jsx';
import "leaflet/dist/leaflet.css";
import "../organism/map.css";
import FormControl from '../organism/FormControl.jsx';
import ModalPresentation from '../organism/ModalPresentation.jsx';
import ModalView from '../molecules/ModalView.jsx';
import { useEffect, useState } from 'react';
import Arrow from '../molecules/Arrow.jsx';
import HelpIcon from '../atoms/HelpIcon.jsx';
import Modal from '../organism/Modal.jsx';

const MapView = () => {
    const showModal = useSelector((state) => state.modal.modalState);
    const [modalView, setModalView] = useState(false);
    const [modalExplanation, setModalExplanation] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(isDarkMode);
    }, []);
    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);
    const handleFaqsToggle = () => {
        setModalView(!modalView);
    };

    const handleArrowClick = () => {
        setModalView(true);
    };

    const handleModalExplanation = () => {
        setModalExplanation(!modalExplanation);
    }
    const closeModalExplenation = () => {
        setModalExplanation(false);
    }

    return (
        <div className='h-full overflow-hidden w-full relative'>
            <div className='absolute right-3 top-4 z-50 rounded-lg glass-container cursor-pointer' onClick={handleModalExplanation}><HelpIcon /></div>
            <div className='h-full w-full px-2 pt-2 dark:bg-nmate-950'>
                <Map />
                {modalView === true && (
                    <ModalView onToggleContent={handleFaqsToggle} />
                )}
            </div>
            {modalView === false && (
                <div className='relative bottom-20 z-30 flex justify-center'>
                    <div className='h-12 w-12 flex items-center glass-container rounded-xl shadow-xl justify-center'>
                        <Arrow onClick={handleArrowClick} />
                    </div>
                </div>
            )}
            {modalExplanation && (
                <Modal>
                    <ModalPresentation closeModalExplenation={closeModalExplenation} />
                </Modal>
            )}
            {showModal && (
                <Modal>
                    <FormControl />
                </Modal>
            )}
        </div>
    );
};

export default MapView;
