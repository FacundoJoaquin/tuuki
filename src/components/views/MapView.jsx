import { useSelector } from 'react-redux'; 
import Map from '../organism/Map.jsx';
import "leaflet/dist/leaflet.css";
import "../organism/map.css";
import FormControl from '../molecules/FormControl.jsx';
import Modal from '../molecules/Modal.jsx';

const MapView = () => {
    const showModal = useSelector((state) => state.modal.modalState);

    return (
        <div className='h-3/4'>
            <h1 className='p-1 ml-1 font-bold text-xl'>Mapa</h1>
            <div className='h-full w-full px-2'>
                <Map />
            </div>
            {showModal && (
                <Modal>
                    <FormControl />
                </Modal>
            )}
        </div>
    );
};

export default MapView;
