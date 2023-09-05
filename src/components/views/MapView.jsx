import { useSelector } from 'react-redux';
import Map from '../organism/Map.jsx';
import "leaflet/dist/leaflet.css";
import "../organism/map.css";
import FormControl from '../organism/FormControl.jsx';
import Modal from '../molecules/Modal.jsx';
import Faqs from '../molecules/Faqs.jsx';
import { useState } from 'react';
import Arrow from '../molecules/Arrow.jsx';

const MapView = () => {
    const showModal = useSelector((state) => state.modal.modalState);
    const [faqsVisible, setFaqsVisible] = useState(false);

    const handleFaqsToggle = () => {
        setFaqsVisible(!faqsVisible);
    };

    const handleArrowClick = () => {
        setFaqsVisible(true);
    };


    return (
        <div className='h-screen overflow-hidden'>
            <h1 className='p-1 ml-1 font-bold text-xl'>Mapa</h1>
            <div className='h-screen w-auto px-2 '>
                <Map />
                {faqsVisible === true && (
                    <Faqs onToggleContent={handleFaqsToggle} />
                )}
            </div>
            {faqsVisible === false && (
                <div className='relative bottom-32 z-30 flex justify-center'>
                    <Arrow onClick={handleArrowClick} />
                </div>
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
