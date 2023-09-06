import { useSelector } from 'react-redux';
import Map from '../organism/Map.jsx';
import "leaflet/dist/leaflet.css";
import "../organism/map.css";
import FormControl from '../organism/FormControl.jsx';
import Modal from '../molecules/Modal.jsx';
import ModalView from '../molecules/ModalView.jsx';
import { useState } from 'react';
import Arrow from '../molecules/Arrow.jsx';

const MapView = () => {
    const showModal = useSelector((state) => state.modal.modalState);
    const [modalView, setModalView] = useState(false);

    const handleFaqsToggle = () => {
        setModalView(!modalView);
    };

    const handleArrowClick = () => {
        setModalView(true);
    };


    return (
        <div className='h-full overflow-hidden w-full'>
            <h1 className='p-1 ml-1 font-bold text-xl'>Mapa</h1>
            <div className='h-full w-full px-2 '>
                <Map />
                {modalView === true && (
                    <ModalView onToggleContent={handleFaqsToggle} />
                )}
            </div>
            {modalView === false && (
                <div className='relative bottom-28 z-30 flex justify-center'>
                    <div className='h-12 w-12 flex items-center glass-container rounded-xl shadow-xl justify-center'>
                        <Arrow onClick={handleArrowClick} />
                    </div>
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
